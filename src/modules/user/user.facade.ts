/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ActivationStatus,
  ProfileUpdationStatus,
  RegistrationSteps,
  UserRequestState,
} from 'src/shared/enums/miscellaneous.enum';
import { S3Service } from 'src/shared/services/s3.service';
import { MasterService } from '../master/master.service';
import { CreateUserReligionDto } from './dtos/craete-user-religion.dto';
import { CreateAdminUserDto } from './dtos/create-admin-user.dto';
import { CreateUserAboutDto } from './dtos/create-user-about.dto';
import { CreateUserBasicDto } from './dtos/create-user-basic.dto';
import { CreateUserBioImageDto } from './dtos/create-user-bio-image.dto';
import { CreateUserCareerDto } from './dtos/create-user-career.dto';
import { CreateUserFamilyBgDto } from './dtos/create-user-familybg.dto';
import { CreateUserFamilyDDto } from './dtos/create-user-familyd.dto';
import { CreateUserHabitDto } from './dtos/create-user-habit.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UserBasic } from './entities/user-basic.entity';
import { UserService } from './user.service';
import * as shortid from 'shortid';
const fs = require('fs');
const resolve = require('path').resolve;
const searchedDiplayIds = require('../../shared/searches/searched_displayids.json');
import * as app_root from 'app-root-path';
import * as _ from 'lodash';
import { UserFilterDto } from './dtos/user-filter.dto';
import { ConnectService } from '../connect/connect.service';

@Injectable()
export class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly masterService: MasterService,
    private readonly s3Service: S3Service,
    private readonly connectService: ConnectService,
  ) { }

  async getAllUsers(skip: string, take: string, isVerified: string) {
    const users = await this.userService.getAllUsers(skip, take);
    if (isVerified != null && isVerified == 'true') {
      return users.filter(
        (x) => x.activationStatus == ActivationStatus.Verified,
      );
    } else {
      return users;
    }
  }

  async createUserBasic(createUserBasicDto: CreateUserBasicDto) {
    const user = await this.userService.getUserBasicByEmail(
      createUserBasicDto.email,
    );
    if (!_.isEmpty(user)) {
      throw new HttpException(
        'Email is already registred.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return await this.userService.createUserBasic(createUserBasicDto);
  }

  async createUserAbout(createUserAboutDto: CreateUserAboutDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserAboutDto.userBasicId,
    );
    return await this.userService.createUserAbout(
      userBasic,
      createUserAboutDto,
    );
  }

  async createUserHabit(createUserHabitDto: CreateUserHabitDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserHabitDto.userBasicId,
    );
    return await this.userService.createUserHabit(
      userBasic,
      createUserHabitDto,
    );
  }

  async createUserReligion(createUserReligionDto: CreateUserReligionDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserReligionDto.userBasicId,
    );
    return await this.userService.createUserReligion(
      userBasic,
      createUserReligionDto,
    );
  }

  async createUserCareer(createUserCareerDto: CreateUserCareerDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserCareerDto.userBasicId,
    );
    return await this.userService.createUserCareer(
      userBasic,
      createUserCareerDto,
    );
  }

  async createUserFamilyBackground(
    createUserFamilyBgDto: CreateUserFamilyBgDto,
  ) {
    const userBasic = await this.userService.getUserBasicById(
      createUserFamilyBgDto.userBasicId,
    );
    return await this.userService.createUserFamilyBackground(
      userBasic,
      createUserFamilyBgDto,
    );
  }

  async createUserFamilyDetail(createUserFamilyDDto: CreateUserFamilyDDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserFamilyDDto.userBasicId,
    );
    return await this.userService.createUserFamilyDetail(
      userBasic,
      createUserFamilyDDto,
    );
  }

  async uploadUserImages(userId: string, files: any) {
    let promiseArr = [];
    let imageArr = [];
    for (let i = 0; i < files.length; i++) {
      let rand = shortid.generate();
      const key = `${userId}/${rand}_${files[i].originalname}`;
      promiseArr.push(await this.s3Service.uploadDirectlyToS3(key, files[i]));
      imageArr.push(`${process.env.S3_PREFIX_URL}${key}`);
    }
    await Promise.all(promiseArr);
    return imageArr;
  }

  async createUserBioWithImages(createUserBioImageDto: CreateUserBioImageDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserBioImageDto.userBasicId,
    );
    const res = await this.userService.createUserBioWithImages(
      userBasic,
      createUserBioImageDto,
    );
    // this.verifyUserByAdmin(createUserBioImageDto.userBasicId);
    return res;
  }

  async rejectUserByAdmin(userBasicId: string) {
    const user = await this.userService.getUserById(userBasicId);
    user.updateStatus(ActivationStatus.Rejected, RegistrationSteps.Completed);
    await this.userService.updateUserBasic(user);
  }

  async verifyUserByAdmin(userBasicId: string) {
    const user = await this.userService.getUserById(userBasicId);
    user.updateStatus(ActivationStatus.Verified, RegistrationSteps.Completed);
    await this.userService.updateUserBasic(user);
    this.updateChildStatusesAfterAdminVerification(user);
  }

  private async updateChildStatusesAfterAdminVerification(user: UserBasic) {
    const userAbout = user.userAbouts.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserAboutStatus(
      userAbout,
      ProfileUpdationStatus.Current,
    );
    const userHabits = user.userHabits.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserHabitStatus(
      userHabits,
      ProfileUpdationStatus.Current,
    );
    const userReligions = user.userReligions.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserReligionStatus(
      userReligions,
      ProfileUpdationStatus.Current,
    );
    const userCareers = user.userCareers.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserCareerStatus(
      userCareers,
      ProfileUpdationStatus.Current,
    );
    const userFamilyBackgrounds = user.userFamilyBackgrounds.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserFamilyBackgroundStatus(
      userFamilyBackgrounds,
      ProfileUpdationStatus.Current,
    );
    const userFamilyDetails = user.userFamilyDetails.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserFamilyDetailStatus(
      userFamilyDetails,
      ProfileUpdationStatus.Current,
    );
    const userBios = user.userBios.find(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserBioStatus(
      userBios,
      ProfileUpdationStatus.Current,
    );
    const userImages = user.userImages.filter(
      (x) => x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    await this.userService.updateUserImageStatus(
      userImages,
      ProfileUpdationStatus.Current,
    );
  }
  async getUserFromDisplayId(userBasicId: string, displayId: string) {
    let queryString = `SELECT * FROM users_view_admin uv WHERE uv.diplayId = ${displayId}`;
    const result = await this.userService.getProfilesByPreference(queryString);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: ""
      }
      let isConnectOne = connectUsers.find(u => u.requestedUserBasicId == uu.id);
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        tempObj.isLiked = true,
          tempObj.requested = true,
          tempObj.isConnected = isConnectOne.userRequestState == UserRequestState.Active ? true : false;
        tempObj.id = isConnectOne.id
      }
      let isConnectTwo = connectUsers.find(u => u.requestingUserBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isLiked = true,
          tempObj.sent = true,
          tempObj.isConnected = isConnectTwo.userRequestState == UserRequestState.Active ? true : false;
        tempObj.id = isConnectTwo.id
      }
      uu['interestStatus'] = tempObj;
    })

    // Get connect requestUser for call and message
    const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isConnected: false,
        id: null
      }
      let isConnectOne = connectedUserForCall.find(u => u.userOneBasicId == uu.id);
      if (isConnectOne != null) {
        tempObj.isConnected = true,
          tempObj.id = isConnectOne.id
      }
      let isConnectTwo = connectedUserForCall.find(u => u.userTwoBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isConnected = true,
          tempObj.id = isConnectTwo.id
      }
      uu['connectStatus'] = tempObj;
    })
    return uniqueUsers;
  }

  async getProfilesByPreference(userBasicId: string, queryObj: any) {
    let userGenderAndPreference =
      await this.userService.getUserGenderAndPreference(userBasicId);
    // let queryString = `SELECT * FROM users_view uv WHERE uv.registrationStep = 10;`
    let genderPreference = 0;
    if (userGenderAndPreference.gender == 0) {
      genderPreference = 1;
    }
    let queryString = `SELECT * FROM users_view_admin uv WHERE uv.gender = ${genderPreference}`;
    // if (userGenderAndPreference.minAge != null) {
    //   queryString = queryString + ` AND uv.age >= ${userGenderAndPreference.minAge}`
    // }
    // if (userGenderAndPreference.maxAge != null) {
    //   queryString = queryString + ` AND uv.age <= ${userGenderAndPreference.maxAge}`
    // }
    // if (userGenderAndPreference.minHeight != null) {
    //   queryString = queryString + ` AND uv.height >= ${userGenderAndPreference.minHeight}`
    // }
    // if (userGenderAndPreference.maxHeight != null) {
    //   queryString = queryString + ` AND uv.height <= ${userGenderAndPreference.maxHeight}`
    // }
    queryString = queryString + ` AND uv.registrationStep in (10, 11);`;
    console.log(queryString);
    const result = await this.userService.getProfilesByPreference(queryString);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: ""
      }
      let isConnectOne = connectUsers.find(u => u.requestedUserBasicId == uu.id);
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        tempObj.isLiked = true,
          tempObj.requested = true,
          tempObj.isConnected = isConnectOne.userRequestState == UserRequestState.Active ? true : false;
        tempObj.id = isConnectOne.id
      }
      let isConnectTwo = connectUsers.find(u => u.requestingUserBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isLiked = true,
          tempObj.sent = true,
          tempObj.isConnected = isConnectTwo.userRequestState == UserRequestState.Active ? true : false;
        tempObj.id = isConnectTwo.id
      }
      uu['interestStatus'] = tempObj;
    })

    // Get connect requestUser for call and message
    const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isConnected: false,
        id: null
      }
      let isConnectOne = connectedUserForCall.find(u => u.userOneBasicId == uu.id);
      if (isConnectOne != null) {
        tempObj.isConnected = true,
          tempObj.id = isConnectOne.id
      }
      let isConnectTwo = connectedUserForCall.find(u => u.userTwoBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isConnected = true,
          tempObj.id = isConnectTwo.id
      }
      uu['connectStatus'] = tempObj;
    })
    return uniqueUsers;
  }

  async getFilteredUsers(userFilterDto: UserFilterDto) {
    let userGenderAndPreference =
      await this.userService.getUserGenderAndPreference(
        userFilterDto.userBasicId,
      );
    let genderPreference = 0;
    if (userGenderAndPreference.gender == 0) {
      genderPreference = 1;
    }
    let queryString = `SELECT * FROM users_view_admin uv WHERE uv.gender = ${genderPreference}`;
    if (userFilterDto.minAge != null) {
      queryString = queryString + ` AND uv.age >= ${userFilterDto.minAge}`;
    }
    if (userFilterDto.maxAge != null) {
      queryString = queryString + ` AND uv.age <= ${userFilterDto.maxAge}`;
    }
    if (userFilterDto.minHeight != null) {
      queryString =
        queryString + ` AND uv.height >= ${userFilterDto.minHeight}`;
    }
    if (userFilterDto.maxHeight != null) {
      queryString =
        queryString + ` AND uv.height <= ${userFilterDto.maxHeight}`;
    }
    queryString = queryString + ` AND uv.registrationStep in (10, 11);`;
    console.log(queryString);
    const result = await this.userService.getProfilesByPreference(queryString);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    // Get blocked users
    // Get liked users
    const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userFilterDto.userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false
      }
      let isConnectOne = connectUsers.find(u => u.requestedUserBasicId == uu.id);
      if (isConnectOne != null) {
        tempObj.isLiked = true,
          tempObj.requested = true,
          tempObj.isConnected = isConnectOne.userRequestState == UserRequestState.Active ? true : false;
      }
      let isConnectTwo = connectUsers.find(u => u.requestingUserBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isLiked = true,
          tempObj.sent = true,
          tempObj.isConnected = isConnectTwo.userRequestState == UserRequestState.Active ? true : false;
      }
      uu['connectStatus'] = tempObj;
    })
    // Get connect requestUser for call and message
    const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userFilterDto.userBasicId);
    uniqueUsers.forEach(uu => {
      let tempObj = {
        isConnectedForCallMessage: false,
        userConnectRequestId: null
      }
      let isConnectOne = connectedUserForCall.find(u => u.userOneBasicId == uu.id);
      if (isConnectOne != null) {
        tempObj.isConnectedForCallMessage = true,
          tempObj.userConnectRequestId = isConnectOne.id
      }
      let isConnectTwo = connectedUserForCall.find(u => u.userTwoBasicId == uu.id);
      if (isConnectTwo != null) {
        tempObj.isConnectedForCallMessage = true,
          tempObj.userConnectRequestId = isConnectOne.id
      }
      uu['connectRequestCallMessageStatus'] = tempObj;
    })
    return uniqueUsers;
  }

  async getPresignedUrl(
    userBasicId: string,
    fileKey: string,
    contentType: string,
  ) {
    return await this.s3Service.getPresignedUrl(fileKey, contentType);
  }

  async getAdminUsers() {
    return this.userService.getAdminUsers();
  }
  async createAdminUser(createAdminUserDto: CreateAdminUserDto) {
    const adminUser = await this.userService.getAdminUserByEmail(
      createAdminUserDto.email,
    );
    if (!_.isEmpty(adminUser)) {
      throw new HttpException(
        'Email is already registred.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return this.userService.createAdminUser(createAdminUserDto);
  }

  async createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto) {
    const userBasic = await this.userService.getUserById(
      createUserPreferenceDto.userBasicId,
    );
    const res = await this.userService.createUserPreference(
      userBasic,
      createUserPreferenceDto,
    );
    delete res.userBasic;
    return res;
  }

  async getUserDeatailById(userBasicId: string) {
    const userDetails = await this.userService.getAllUserDetailsById(
      userBasicId,
    );
    userDetails.userCareers = userDetails.userCareers.filter(
      (x) =>
        x.profileUpdationStatus == ProfileUpdationStatus.Current ||
        x.profileUpdationStatus == ProfileUpdationStatus.Pending,
    );
    userDetails.userFamilyBackgrounds =
      userDetails.userFamilyBackgrounds.filter(
        (x) =>
          x.profileUpdationStatus == ProfileUpdationStatus.Current ||
          x.profileUpdationStatus == ProfileUpdationStatus.Pending,
      );
    for (let i = 0; i < userDetails.userCareers.length; i++) {
      let country = await this.masterService.getCountry(
        userDetails.userCareers[i].country,
      );
      let state = await this.masterService.getState(
        userDetails.userCareers[i].state,
      );
      let city = await this.masterService.getCity(
        userDetails.userCareers[i].city,
      );
      userDetails.userCareers[i]['countryName'] = country['name'];
      userDetails.userCareers[i]['stateName'] = state['name'];
      userDetails.userCareers[i]['cityName'] = city['name'];
    }

    for (let i = 0; i < userDetails.userFamilyBackgrounds.length; i++) {
      let country = await this.masterService.getCountry(
        userDetails.userFamilyBackgrounds[i].country,
      );
      let state = await this.masterService.getState(
        userDetails.userFamilyBackgrounds[i].state,
      );
      let city = await this.masterService.getCity(
        userDetails.userFamilyBackgrounds[i].city,
      );
      userDetails.userFamilyBackgrounds[i]['countryName'] = country['name'];
      userDetails.userFamilyBackgrounds[i]['stateName'] = state['name'];
      userDetails.userFamilyBackgrounds[i]['cityName'] = city['name'];
    }
    return userDetails;
  }

  async getAppUsersForAdmin(filterObj: any) {
    let queryString = `SELECT uv.id,
    uv.displayId,
    uv.name,
    uv.phoneNumber,
    uv.email,
    uv.gender,
    uv.createdAt,
    uv.lifecycleStatus,
    uv.religion,
    uv.cast,
    uv.gothra,
    uv.relationship,
    uv.careerCity,
    uv.motherTongue,
    uv.careerState,
    uv.careerCountry,
    uv.activationStatus
    FROM users_view_admin uv WHERE uv.isActive = true AND uv.registrationStep > 8`;
    if (filterObj['gender'] != undefined) {
      queryString = queryString + ` AND uv.gender = ${filterObj['gender']}`;
    }
    if (filterObj['displayId'] != undefined) {
      if (filterObj['displayId'].includes('@')) {
        queryString =
          queryString + ` AND uv.email = '${filterObj['displayId']}'`;
      } else if (/^\d+$/.test(filterObj['displayId'])) {
        queryString =
          queryString + ` AND uv.phoneNumber = '${filterObj['displayId']}'`;
      } else {
        queryString =
          queryString + ` AND uv.displayId = '${filterObj['displayId']}'`;
      }
    }
    if (filterObj['cast'] != undefined) {
      queryString = queryString + ` AND uv.cast = '${filterObj['cast']}'`;
    }
    if (filterObj['religion'] != undefined) {
      queryString =
        queryString + ` AND uv.religion = '${filterObj['religion']}'`;
    }
    if (filterObj['location'] != undefined) {
      queryString =
        queryString + ` AND uv.careerCity = '${filterObj['location']}'`;
    }
    if (filterObj['state'] != undefined) {
      queryString =
        queryString + ` AND uv.careerState = '${filterObj['state']}'`;
    }
    if (filterObj['country'] != undefined) {
      queryString =
        queryString + ` AND uv.careerCountry = '${filterObj['country']}'`;
    }
    if (filterObj['relationship'] != undefined) {
      queryString =
        queryString + ` AND uv.relationship = ${filterObj['relationship']}`;
    }
    if (
      filterObj['startDate'] != undefined &&
      filterObj['endDate'] != undefined
    ) {
      queryString =
        queryString +
        ` AND uv.createdAt >= '${filterObj['startDate']}' AND uv.createdAt <= '${filterObj['endDate']}'`;
    }
    if (filterObj['isVerified'] != undefined) {
      let isVerified = +filterObj['isVerified'];
      queryString = queryString + ` AND uv.activationStatus = ${isVerified}`;
    }
    if (filterObj['motherTongue'] != undefined) {
      queryString =
        queryString + ` AND uv.motherTongue = '${filterObj['motherTongue']}'`;
    }
    if (filterObj['limit'] == undefined) {
      filterObj['limit'] = 1000;
    }
    if (filterObj['offset'] == undefined) {
      filterObj['offset'] = 0;
    }
    queryString =
      queryString +
      ` ORDER BY uv.createdAt DESC LIMIT ${filterObj['limit']} OFFSET ${filterObj['offset']};`;
    console.log(queryString);
    let result = {
      users: [],
      count: 0,
      lastSearchedIds: [],
    };
    let res = await this.userService.getAppUsersForAdmin(queryString);
    // if (_.isEmpty(res)) {
    //   return [];
    //   // throw new HttpException('No record found.', HttpStatus.EXPECTATION_FAILED);
    // }
    let serachedResults = JSON.parse(
      fs.readFileSync(
        app_root.resolve('src/shared/searches/searched_displayids.json'),
      ),
    );

    if (filterObj['displayId'] != undefined) {
      if (res.length > 0) {
        const newSearchedRecord = {
          userId: res[0].id,
          displayId: res[0].displayId,
        };
        let found = serachedResults.find(
          (x) => x.displayId == newSearchedRecord.displayId,
        );
        if (found == null) {
          serachedResults = await this.updateSearchedResults(
            serachedResults,
            newSearchedRecord,
          );
        }
      }
    }
    let uniqueUsers = [];
    res.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    result.users = uniqueUsers;
    result.count = uniqueUsers.length;

    result.lastSearchedIds = serachedResults;
    console.log('********', serachedResults);
    return result;
  }

  private async updateSearchedResults(data: any, newSearchedRecord: any) {
    if (data.length > 10) {
      data.pop();
    }
    data.push(newSearchedRecord);
    fs.writeFileSync(
      app_root.resolve('src/shared/searches/searched_displayids.json'),
      JSON.stringify(data),
    );
    return data;
  }

  public async validateEmail(email: string) {
    let obj = {
      isEmailAvailable: true,
    };
    const user = await this.userService.getUserBasicByEmail(email);
    if (!_.isEmpty(user)) obj.isEmailAvailable = false;
    return obj;
  }

  async getMatchPercentage(otherUserBasicId: string) {
    return Math.floor(Math.random() * 100);
  }

  async visistedProfile(visitedBy: string, visitedTo: string) {
    return this.userService.visitedProfile(visitedBy, visitedTo);
  }
  async recentProfileViews(userBasicId: string) {
    return this.userService.recentProfileViews(userBasicId);
  }
  async getProifleVisitedBy(userBasicId: string) {
    return this.userService.getProifleVisitedBy(userBasicId);
  }

  async getPremiumMembers(userBasicId: string) {
    return this.userService.getPremiumMembers(userBasicId);
  }
}
