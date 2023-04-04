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
import {
  CreateUserBioImageDto,
  UpdateUserDocsDto,
} from './dtos/create-user-bio-image.dto';
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
// const searchedDiplayIds = require('../../shared/searches/searched_displayids.json');
import * as app_root from 'app-root-path';
import * as _ from 'lodash';
import { UserFilterDto } from './dtos/user-filter.dto';
import { ConnectService } from '../connect/connect.service';
import { getManager } from 'typeorm';
import { religion } from 'src/shared/constants/profile-master-data/religion';
import { motherTongue } from 'src/shared/constants/profile-master-data/mother-tongue';
import { castSubcaste } from 'src/shared/constants/profile-master-data/cast-subcaste';
import { AdminUser } from './entities/admin-user.entity';
import { CreateUserLifestyleDto } from './dtos/create-user-lifestyle.dto';
import { CreateUserHobbiesDto } from './dtos/create-user-hobbies.dto';
import { UserBlock } from './entities/block-user.entity';

@Injectable()
export class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly masterService: MasterService,
    private readonly s3Service: S3Service,
    private readonly connectService: ConnectService,
  ) {}

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
  async updateUserRegistrationStep(userBasicId, step) {
    const user = await this.userService.getUserById(userBasicId);
    // user.updateRegistrationStep(RegistrationSteps.Completed);
    user.updateRegistrationStep(step);
    return await this.userService.updateUserBasic(user);
  }
  async createUserBasic(
    fireBaseToken: any,
    createUserBasicDto: CreateUserBasicDto,
  ) {
    const user = await this.userService.getUserBasicByEmail(
      createUserBasicDto.email,
    );
    if (!_.isEmpty(user)) {
      throw new HttpException(
        'Email is already registred.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return await this.userService.createUserBasic(
      fireBaseToken,
      createUserBasicDto,
    );
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
  async createUserLifestyle(createUserLifestyleDto: CreateUserLifestyleDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserLifestyleDto.userBasicId,
    );
    return await this.userService.createUserLifestyle(
      userBasic,
      createUserLifestyleDto,
    );
  }
  async createUserHobbies(createUserHobbiesDto: CreateUserHobbiesDto) {
    const userBasic = await this.userService.getUserBasicById(
      createUserHobbiesDto.userBasicId,
    );
    return await this.userService.createUserHobbies(
      userBasic,
      createUserHobbiesDto,
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

  async uploadUserDocImages(userId: string, files: any) {
    let docPromiseArr = [];
    let docImageArr = [];
    let docIdProof = '';
    for (let i = 0; i < files.length; i++) {
      let rand = shortid.generate();
      const key = `${userId}/${rand}_${files[i].originalname}`;
      docPromiseArr.push(
        await this.s3Service.uploadDirectlyToS3(key, files[i]),
      );
      docImageArr.push(`${process.env.S3_PREFIX_URL}${key}`);
    }
    await Promise.all(docPromiseArr);
    console.log('Doc Image Array');
    return docImageArr;
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

  async updateUserBioWithDocs(updateUserDocsDto: UpdateUserDocsDto) {
    const userBasic = await this.userService.getUserBasicById(
      updateUserDocsDto.userBasicId,
    );
    const res = await this.userService.updateUserBioWithDocs(
      userBasic,
      updateUserDocsDto,
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
    // let queryString = `SELECT * FROM users_view_admin uv WHERE uv.diplayId = ${displayId}`;
    let queryString = `SELECT * FROM users_view_admin as uv WHERE uv.displayId = '${displayId}'`;
    const result = await this.userService.getProfilesByPreference(queryString);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers =
      await this.connectService.getUserRequestStatusForAppPrefAndFilter(
        userBasicId,
      );
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: '',
      };
      let isConnectOne = connectUsers.find(
        (u) => u.requestedUserBasicId == uu.id,
      );
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        (tempObj.isLiked = true),
          (tempObj.requested = true),
          (tempObj.isConnected =
            isConnectOne.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectOne.id;
      }
      let isConnectTwo = connectUsers.find(
        (u) => u.requestingUserBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isLiked = true),
          (tempObj.sent = true),
          (tempObj.isConnected =
            isConnectTwo.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectTwo.id;
      }
      uu['interestStatus'] = tempObj;
    });

    // Get connect requestUser for call and message
    const connectedUserForCall =
      await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isConnected: false,
        id: null,
      };
      let isConnectOne = connectedUserForCall.find(
        (u) => u.userOneBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
      }
      let isConnectTwo = connectedUserForCall.find(
        (u) => u.userTwoBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
      }
      uu['connectStatus'] = tempObj;
    });
    return uniqueUsers;
  }

  async getProfilesByPreference(userBasicId: string, queryObj: any) {
    console.log('queryObj', queryObj);
    let userGenderAndPreference =
      await this.userService.getUserGenderAndPreference(userBasicId);
    console.log('USERGENDERPREF', userGenderAndPreference);
    //console.log("USERGENDERPREF",JSON.parse(userGenderAndPreference.religion).split(','));
    // let queryString = `SELECT * FROM users_view uv WHERE uv.registrationStep = 10;`
    if (userGenderAndPreference) {
      const religionInClause = JSON.parse(
        userGenderAndPreference.religion.toString().replace("'", ''),
      )
        .map((religion) => "'" + religion + "'")
        .join();
      const casteInClause = JSON.parse(
        userGenderAndPreference.caste.toString().replace("'", ''),
      )
        .map((caste) => "'" + caste + "'")
        .join();
      const motherTongueClause = JSON.parse(
        userGenderAndPreference.motherTongue.toString().replace("'", ''),
      )
        .map((mothertongue) => "'" + mothertongue + "'")
        .join();
      const eatingHabitClause = JSON.parse(
        userGenderAndPreference.dietaryHabits.toString().replace("'", ''),
      )
        .map((eatinghabit) => "'" + eatinghabit + "'")
        .join();
      const drinkingHabitClause = JSON.parse(
        userGenderAndPreference.drinkingHabits.toString().replace("'", ''),
      )
        .map((drinkinghabit) => "'" + drinkinghabit + "'")
        .join();
      const smokingHabitClause = JSON.parse(
        userGenderAndPreference.smokingHabits.toString().replace("'", ''),
      )
        .map((smokinghabit) => "'" + smokinghabit + "'")
        .join();
      const maritalStatusClause = JSON.parse(
        userGenderAndPreference.maritalStatus.toString().replace("'", ''),
      )
        .map((maritalstatus) => "'" + maritalstatus + "'")
        .join();
      const minIncomeClause = JSON.parse(
        userGenderAndPreference.minIncome.toString(),
      );
      const maxIncomeClause = JSON.parse(
        userGenderAndPreference.minIncome.toString(),
      );
      // console.log("religionInClause",religionInClause);
      // console.log("motherInClause",motherTongueClause);
      // console.log("eatingInClause",eatingHabitClause);
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
      if (casteInClause.length > 0) {
        queryString = queryString + ` AND uv.cast in (${casteInClause})`;
      }
      if (religionInClause.length > 0) {
        queryString = queryString + ` AND uv.religion in (${religionInClause})`;
      }
      if (motherTongueClause.length > 0) {
        queryString =
          queryString + ` AND uv.motherTongue in (${motherTongueClause})`;
      }
      if (smokingHabitClause.length) {
        queryString =
          queryString + ` AND uv.smokingHabit in (${smokingHabitClause})`;
      }
      if (eatingHabitClause.length) {
        queryString =
          queryString + ` AND uv.eatingHabit in (${eatingHabitClause})`;
      }
      if (drinkingHabitClause.length) {
        queryString =
          queryString + ` AND uv.drinkingHabit in (${drinkingHabitClause})`;
      }
      if (maritalStatusClause.length) {
        queryString =
          queryString + ` AND uv.maritalStatus in (${maritalStatusClause})`;
      }
      if (minIncomeClause.length) {
        queryString =
          queryString + ` AND uv.annualIncome >= ${minIncomeClause[0]}`;
      }
      if (maxIncomeClause.length) {
        queryString =
          queryString + ` AND uv.annualIncome <= ${maxIncomeClause[0]}`;
      }
      console.log('queryString', queryString);
      queryString =
        queryString +
        ` AND uv.registrationStep in (10, 11) AND uv.activationStatus = 1;`;
      console.log(queryString);
      const result = await this.userService.getProfilesByPreference(
        queryString,
      );
      let uniqueUsers = [];
      result.forEach((r: { id: any }) => {
        let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
        if (_.isEmpty(dup)) {
          uniqueUsers.push(r);
        }
      });
      const connectUsers =
        await this.connectService.getUserRequestStatusForAppPrefAndFilter(
          userBasicId,
        );
      const blockedUser = await this.getBlockedUsersForAll(userBasicId);
      console.log('blockedUser', blockedUser);
      // console.log('connectUsers', connectUsers);
      uniqueUsers.forEach((uu) => {
        let tempObj = {
          isLiked: false,
          sent: false,
          requested: false,
          isConnected: false,
          id: '',
        };
        let blockObj = {
          isBlocked: false,
          id: '',
        };
        let requiredObj = {};
        let isConnectOne = connectUsers.find(
          (u) => u.requestedUserBasicId == uu.id,
        );
        let isBlockedOne = blockedUser.find((u) => u.block_whom == uu.id);
        let isBlockedTwo = blockedUser.find((u) => u.block_who == uu.id);
        // console.log(isConnectOne);
        if (isBlockedOne != null) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedOne.id;
        }
        if (isBlockedTwo != null) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedOne.id;
        }
        if (isConnectOne != null) {
          (tempObj.isLiked = true),
            (tempObj.requested = true),
            (tempObj.isConnected =
              isConnectOne.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectOne.id;
          requiredObj = isConnectOne;
        }
        let isConnectTwo = connectUsers.find(
          (u) => u.requestingUserBasicId == uu.id,
        );
        if (isConnectTwo != null) {
          (tempObj.isLiked = true),
            (tempObj.sent = true),
            (tempObj.isConnected =
              isConnectTwo.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectTwo.id;
          requiredObj = isConnectTwo;
        }
        uu['interestStatus'] = tempObj;
        uu['UserRequestStatus'] = requiredObj;
        uu['BlockStatus'] = blockObj;
      });
      console.log('UserRequestStatus', connectUsers);
      // Get connect requestUser for call and message
      const connectedUserForCall =
        await this.connectService.getUserConnectRequestsByUserId(userBasicId);

      uniqueUsers.forEach((uu) => {
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let isConnectOne = connectedUserForCall.find(
          (u) => u.userOneBasicId == uu.id,
        );
        if (isConnectOne != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
          // uu['UserRequestStatus'] = uu;
        }
        let isConnectTwo = connectedUserForCall.find(
          (u) => u.userTwoBasicId == uu.id,
        );
        if (isConnectTwo != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
        }
        uu['connectStatus'] = tempObj;
      });
      uniqueUsers['UserRequestStatus'] = connectedUserForCall;
      return uniqueUsers;
    } else {
      return [];
    }
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
    const connectUsers =
      await this.connectService.getUserRequestStatusForAppPrefAndFilter(
        userFilterDto.userBasicId,
      );
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
      };
      let isConnectOne = connectUsers.find(
        (u) => u.requestedUserBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isLiked = true),
          (tempObj.requested = true),
          (tempObj.isConnected =
            isConnectOne.userRequestState == UserRequestState.Active
              ? true
              : false);
      }
      let isConnectTwo = connectUsers.find(
        (u) => u.requestingUserBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isLiked = true),
          (tempObj.sent = true),
          (tempObj.isConnected =
            isConnectTwo.userRequestState == UserRequestState.Active
              ? true
              : false);
      }
      uu['connectStatus'] = tempObj;
    });
    // Get connect requestUser for call and message
    const connectedUserForCall =
      await this.connectService.getUserConnectRequestsByUserId(
        userFilterDto.userBasicId,
      );
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isConnectedForCallMessage: false,
        userConnectRequestId: null,
      };
      let isConnectOne = connectedUserForCall.find(
        (u) => u.userOneBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isConnectedForCallMessage = true),
          (tempObj.userConnectRequestId = isConnectOne.id);
      }
      let isConnectTwo = connectedUserForCall.find(
        (u) => u.userTwoBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isConnectedForCallMessage = true),
          (tempObj.userConnectRequestId = isConnectOne.id);
      }
      uu['connectRequestCallMessageStatus'] = tempObj;
    });
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
  async updateAdminUser(createAdminUserDto: AdminUser) {
    return this.userService.updateAdminUser(createAdminUserDto);
  }

  async createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto) {
    const userBasic = await this.userService.getUserById(
      createUserPreferenceDto.userBasicId,
    );
    const res = await this.userService.createUserPreference(
      userBasic,
      createUserPreferenceDto,
    );
    console.log('result', res);
    delete res.userBasic;
    return res;
  }
  async getUserPartnerPreferences(userBasicId: string) {
    const userBasic = await this.userService.getUserById(userBasicId);

    const res = await this.userService.getUserPartnerPreferences(userBasicId);
    // delete res.userBasic;

    return res;
  }

  async getUserDeatailById(userBasicId: string, myBasicId: string) {
    try {
      const userDetails = await this.userService.getAllUserDetailsById(
        userBasicId,
      );
      let blockStatus = {};
      let blockDetails = {
        isBlocked: false,
        id: '',
      };
      let userReqDet = [];
      if (myBasicId) {
        console.log(myBasicId);
        const entityManager = getManager();
        const rawQuery = `SELECT * from user_requests where requestingUserBasicId='${myBasicId}' AND requestedUserBasicId='${userBasicId}'`;
        userReqDet = await entityManager.query(rawQuery);
        console.log(rawQuery);
        console.log('userReqDet', userReqDet);
        let blockRes = await this.userService.checkIfBlocked(
          myBasicId,
          userBasicId,
        );
        blockStatus = blockRes;
        console.log('blockRes', blockStatus);
        if (blockRes) {
          blockDetails.isBlocked = true;
          blockDetails.id = blockRes.id;
        }
        // blockStatus = blockRes;
      }
      if (userDetails.userCareers) {
        userDetails.userCareers = userDetails.userCareers.filter(
          (x) =>
            x.profileUpdationStatus == ProfileUpdationStatus.Current ||
            x.profileUpdationStatus == ProfileUpdationStatus.Pending ||
            x.profileUpdationStatus == ProfileUpdationStatus.Archived,
        );
      }
      userDetails.userFamilyBackgrounds =
        userDetails.userFamilyBackgrounds.filter(
          (x) =>
            x.profileUpdationStatus == ProfileUpdationStatus.Current ||
            x.profileUpdationStatus == ProfileUpdationStatus.Pending ||
            x.profileUpdationStatus == ProfileUpdationStatus.Archived,
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
        userDetails.userCareers[i]['cityName'] = city ? city['name'] : null;
      }
      if (userDetails.userReligions && userDetails.userReligions.length) {
        for (let i = 0; i < userDetails.userReligions.length; i++) {
          let religionName = userDetails.userReligions[i].religion;
          let religionId = religion.filter((x) => x.text == religionName);
          userDetails.userReligions[i]['religionId'] = religionId;
        }
      }

      if (userDetails.userReligions && userDetails.userReligions.length) {
        for (let i = 0; i < userDetails.userReligions.length; i++) {
          let casteName = userDetails.userReligions[i].religion;
          let subCastName = userDetails.userReligions[i].cast;
          let motherTongueName = userDetails.userReligions[i].motherTongue;

          let motherTongueId = motherTongue.filter(
            (x) => x.text == motherTongueName,
          )[0].id;

          console.log('casteName', userDetails.userReligions[i].religion);
          // let subCasteName = castSubcaste.filter(x=>x.cast==casteName)[0].subCaste;
          console.log('subCasteName', subCastName);
          userDetails.userReligions[i]['casteName'] = casteName;
          userDetails.userReligions[i]['subCasteName'] = subCastName;
          userDetails.userReligions[i]['motherTongueId'] = motherTongueId;
        }
      }

      if (userDetails.userHobbies && userDetails.userHobbies.length) {
        for (let i = 0; i < userDetails.userHobbies.length; i++) {
          let hobbies = userDetails.userHobbies[i].hobbies;
          // let subCastName = userDetails.userReligions[i].cast;
          // let motherTongueName = userDetails.userReligions[i].motherTongue;

          console.log('HOBBIES', userDetails.userHobbies[i].hobbies);
          // let subCasteName = castSubcaste.filter(x=>x.cast==casteName)[0].subCaste;

          userDetails.userHobbies[i]['hobbies'] = hobbies;
          // userDetails.userReligions[i]['subCasteName'] = subCastName;
          // userDetails.userReligions[i]['motherTongueId'] = motherTongueId;
        }
      }

      if (userDetails.userLifestyle && userDetails.userLifestyle.length) {
        for (let i = 0; i < userDetails.userLifestyle.length; i++) {
          let lifestyle = userDetails.userLifestyle[i].lifestyle;
          // let subCastName = userDetails.userReligions[i].cast;
          // let motherTongueName = userDetails.userReligions[i].motherTongue;

          console.log('LIFESTYLE', userDetails.userLifestyle[i].lifestyle);
          // let subCasteName = castSubcaste.filter(x=>x.cast==casteName)[0].subCaste;

          userDetails.userLifestyle[i]['lifestyle'] = lifestyle;
          // userDetails.userReligions[i]['subCasteName'] = subCastName;
          // userDetails.userReligions[i]['motherTongueId'] = motherTongueId;
        }
      }

      if (userDetails.userHobbies && userDetails.userHobbies.length) {
        for (let i = 0; i < userDetails.userHobbies.length; i++) {
          let hobbies = userDetails.userHobbies[i].hobbies;
          // let subCastName = userDetails.userReligions[i].cast;
          // let motherTongueName = userDetails.userReligions[i].motherTongue;

          console.log('HOBBIES', userDetails.userHobbies[i].hobbies);
          // let subCasteName = castSubcaste.filter(x=>x.cast==casteName)[0].subCaste;

          userDetails.userHobbies[i]['hobbies'] = hobbies;
          // userDetails.userReligions[i]['subCasteName'] = subCastName;
          // userDetails.userReligions[i]['motherTongueId'] = motherTongueId;
        }
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
      let requiredData = {};

      if (myBasicId) {
        console.log('userReqDet', userReqDet);
        let uniqueUsers = [userDetails];
        // Get blocked users
        // Get liked users
        const connectUsers =
          await this.connectService.getUserRequestStatusForAppPrefAndFilter(
            myBasicId,
          );
        console.log('connectUsers', connectUsers);
        let tempObj = {
          isLiked: false,
          sent: false,
          requested: false,
          isConnected: false,
          id: '',
        };
        let requiredObj = {};
        let isConnectOne = connectUsers.find(
          (u) => u.requestedUserBasicId == userDetails.id,
        );
        console.log('isConnectOne', isConnectOne);

        if (isConnectOne != null) {
          (tempObj.isLiked = true),
            (tempObj.requested = true),
            (tempObj.isConnected =
              isConnectOne.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectOne.id;
          requiredObj = isConnectOne;
          userDetails['UserRequestStatus'] = isConnectOne ? [isConnectOne] : [];
        }
        let isConnectTwo = connectUsers.find(
          (u) => u.requestingUserBasicId == userDetails.id,
        );
        console.log('isConnectTwo', isConnectTwo);
        if (isConnectTwo != null) {
          (tempObj.isLiked = true),
            (tempObj.sent = true),
            (tempObj.isConnected =
              isConnectTwo.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectTwo.id;
          requiredObj = isConnectTwo;
          userDetails['UserRequestStatus'] = isConnectTwo ? [isConnectTwo] : [];
        }
        userDetails['interestStatus'] = tempObj;
        uniqueUsers.forEach((uu) => {});

        // // Get connect requestUser for call and message
        const connectedUserForCallAndMessage =
          await this.connectService.getUserConnectRequestsByUserId(userBasicId);
        uniqueUsers.forEach((uu) => {
          let tempObj = {
            isConnected: false,
            id: null,
          };
          let isConnectOne = connectedUserForCallAndMessage.find(
            (u) => u.userOneBasicId == uu.id,
          );
          if (isConnectOne != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
          }
          let isConnectTwo = connectedUserForCallAndMessage.find(
            (u) => u.userTwoBasicId == uu.id,
          );
          if (isConnectTwo != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
          }
          uu['connectStatus'] = tempObj;
        });
        // Get connect requestUser for call and message
        const connectedUserForCall =
          await this.connectService.getUserConnectRequestsByUserId(myBasicId);
        uniqueUsers.forEach((uu) => {
          let tempObj = {
            isConnectedForCallMessage: false,
            userConnectRequestId: null,
          };
          let isConnectOne = connectedUserForCall.find(
            (u) => u.userOneBasicId == uu.id,
          );
          if (isConnectOne != null) {
            (tempObj.isConnectedForCallMessage = true),
              (tempObj.userConnectRequestId = isConnectOne.id);
          }
          let isConnectTwo = connectedUserForCall.find(
            (u) => u.userTwoBasicId == uu.id,
          );
          if (isConnectTwo) {
            (tempObj.isConnectedForCallMessage = true),
              (tempObj.userConnectRequestId = isConnectTwo.id);
          }
          uu['connectRequestCallMessageStatus'] = tempObj;
        });
        console.log('uniqueUsers', uniqueUsers);
        // return uniqueUsers;
      }
      console.log('userDetails', userDetails);
      // if (userReqDet.length > 0) {
      //   requiredData = {
      //     ...userDetails,
      //     UserRequestStatus: userReqDet,
      //     blockStatus: blockStatus,
      //     blockDetails: blockDetails,
      //   };
      // } else {
      //   requiredData = {
      //     ...userDetails,
      //     UserRequestStatus: [],
      //     blockStatus: blockStatus,
      //     blockDetails: blockDetails,
      //   };
      // }

      return {
        ...userDetails,
        blockStatus: blockStatus,
        blockDetails: blockDetails,
      };
    } catch (err) {
      console.log('ERRRRRROR', err);
    }
  }
  async getUserDeatailByDisplayId(displayId: string, myBasicId: string) {
    try {
      const entityManager = getManager();

      const rawQuery = `SELECT id from user_basics where displayId='${displayId}'`;
      const userDet = await entityManager.query(rawQuery);
      console.log('USERDET', userDet);
      if (userDet.length == 0) {
        return undefined;
      }
      const userDetails = await this.userService.getAllUserDetailsById(
        userDet[0].id,
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

      // return userDetails;

      let requiredData = {};
      let userReqDet = [];
      let requiredObj = {};
      if (myBasicId) {
        console.log('userReqDet', userReqDet);
        let uniqueUsers = [userDetails];
        // Get blocked users
        // Get liked users
        const connectUsers =
          await this.connectService.getUserRequestStatusForAppPrefAndFilter(
            myBasicId,
          );
        console.log('connectUsers', connectUsers);
        let tempObj = {
          isLiked: false,
          sent: false,
          requested: false,
          isConnected: false,
          id: '',
        };
        let requiredObj = {};
        let isConnectOne = connectUsers.find(
          (u) => u.requestedUserBasicId == userDetails.id,
        );
        console.log('isConnectOne', isConnectOne);

        if (isConnectOne != null) {
          (tempObj.isLiked = true),
            (tempObj.requested = true),
            (tempObj.isConnected =
              isConnectOne.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectOne.id;
          requiredObj = isConnectOne;
          userDetails['UserRequestStatus'] = isConnectOne ? [isConnectOne] : [];
        }
        let isConnectTwo = connectUsers.find(
          (u) => u.requestingUserBasicId == userDetails.id,
        );
        console.log('isConnectTwo', isConnectTwo);
        if (isConnectTwo != null) {
          (tempObj.isLiked = true),
            (tempObj.sent = true),
            (tempObj.isConnected =
              isConnectTwo.userRequestState == UserRequestState.Active
                ? true
                : false);
          tempObj.id = isConnectTwo.id;
          requiredObj = isConnectTwo;
          userDetails['UserRequestStatus'] = isConnectTwo ? [isConnectTwo] : [];
        }
        userDetails['interestStatus'] = tempObj;
        uniqueUsers.forEach((uu) => {
          console.log(isConnectOne);
        });

        // // Get connect requestUser for call and message
        const connectedUserForCallAndMessage =
          await this.connectService.getUserConnectRequestsByUserId(myBasicId);
        uniqueUsers.forEach((uu) => {
          let tempObj = {
            isConnected: false,
            id: null,
          };
          let isConnectOne = connectedUserForCallAndMessage.find(
            (u) => u.userOneBasicId == uu.id,
          );
          if (isConnectOne != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
          }
          let isConnectTwo = connectedUserForCallAndMessage.find(
            (u) => u.userTwoBasicId == uu.id,
          );
          if (isConnectTwo != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
          }
          uu['connectStatus'] = tempObj;
        });
        // Get connect requestUser for call and message
        const connectedUserForCall =
          await this.connectService.getUserConnectRequestsByUserId(myBasicId);
        uniqueUsers.forEach((uu) => {
          let tempObj = {
            isConnectedForCallMessage: false,
            userConnectRequestId: null,
          };
          let isConnectOne = connectedUserForCall.find(
            (u) => u.userOneBasicId == uu.id,
          );
          if (isConnectOne != null) {
            (tempObj.isConnectedForCallMessage = true),
              (tempObj.userConnectRequestId = isConnectOne.id);
          }
          let isConnectTwo = connectedUserForCall.find(
            (u) => u.userTwoBasicId == uu.id,
          );
          if (isConnectTwo != null) {
            (tempObj.isConnectedForCallMessage = true),
              (tempObj.userConnectRequestId = isConnectOne.id);
          }
          uu['connectRequestCallMessageStatus'] = tempObj;
        });
        console.log('uniqueUsers324324324', uniqueUsers);
        // return uniqueUsers;
      }
      console.log('userDetails', userDetails);
      if (userReqDet.length > 0) {
        requiredData = { ...userDetails };
      } else {
        requiredData = { ...userDetails };
      }

      return requiredData;
    } catch (error) {
      console.log(error);
      return error;
    }
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
    FROM users_view_admin uv 
    JOIN user_logins as ul 
    ON uv.id = ul.userBasicId
    WHERE uv.isActive = true `;
    if (filterObj['gender'] != undefined) {
      queryString = queryString + ` AND uv.gender = ${filterObj['gender']}`;
    }
    if (filterObj['profileStatus'] != undefined) {
      if (filterObj['profileStatus'] == 3) {
        queryString = queryString + ` AND uv.registrationStep < 8`;
      }
      if (filterObj['profileStatus'] == 2) {
        queryString =
          queryString +
          ` AND uv.registrationStep > 8 AND ul.updatedAt< DATE_SUB(NOW(), INTERVAL 60 DAY)`;
      }
    }
    if (!filterObj['profileStatus']) {
      queryString = queryString + ` AND uv.registrationStep > 8`;
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
        ` AND date(uv.createdAt) >= date('${filterObj['startDate']}') AND date(uv.createdAt) <= date('${filterObj['endDate']}') `;
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

  async getMatchPercentage(userBasicId, otherUserBasicId: string) {
    return this.userService.getMatchPercentage(userBasicId, otherUserBasicId);
    //Math.floor(Math.random() * 100);
  }

  async visistedProfile(visitedBy: string, visitedTo: string) {
    return this.userService.visitedProfile(visitedBy, visitedTo);
  }
  async recentProfileViews(userBasicId: string) {
    let result = await this.userService.recentProfileViews(userBasicId);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers =
      await this.connectService.getUserRequestStatusForAppPrefAndFilter(
        userBasicId,
      );
    console.log('connectUsers', connectUsers);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: '',
      };
      let requiredObj = {};
      let isConnectOne = connectUsers.find(
        (u) => u.requestedUserBasicId == uu.id,
      );
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        (tempObj.isLiked = true),
          (tempObj.requested = true),
          (tempObj.isConnected =
            isConnectOne.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectOne.id;
        requiredObj = isConnectOne;
      }
      let isConnectTwo = connectUsers.find(
        (u) => u.requestingUserBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isLiked = true),
          (tempObj.sent = true),
          (tempObj.isConnected =
            isConnectTwo.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectTwo.id;
        requiredObj = isConnectTwo;
      }
      uu['interestStatus'] = tempObj;
      uu['UserRequestStatus'] = requiredObj;
    });

    // Get connect requestUser for call and message
    const connectedUserForCall =
      await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isConnected: false,
        id: null,
      };
      let isConnectOne = connectedUserForCall.find(
        (u) => u.userOneBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
      }
      let isConnectTwo = connectedUserForCall.find(
        (u) => u.userTwoBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
      }
      uu['connectStatus'] = tempObj;
    });
    return uniqueUsers;
  }
  async getProifleVisitedBy(userBasicId: string) {
    let result = await this.userService.getProifleVisitedBy(userBasicId);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers =
      await this.connectService.getUserRequestStatusForAppPrefAndFilter(
        userBasicId,
      );
    console.log('connectUsers', connectUsers);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: '',
      };
      let requiredObj = {};
      let isConnectOne = connectUsers.find(
        (u) => u.requestedUserBasicId == uu.id,
      );
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        (tempObj.isLiked = true),
          (tempObj.requested = true),
          (tempObj.isConnected =
            isConnectOne.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectOne.id;
        requiredObj = isConnectOne;
      }
      let isConnectTwo = connectUsers.find(
        (u) => u.requestingUserBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isLiked = true),
          (tempObj.sent = true),
          (tempObj.isConnected =
            isConnectTwo.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectTwo.id;
        requiredObj = isConnectTwo;
      }
      uu['interestStatus'] = tempObj;
      uu['UserRequestStatus'] = requiredObj;
    });

    // Get connect requestUser for call and message
    const connectedUserForCall =
      await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isConnected: false,
        id: null,
      };
      let isConnectOne = connectedUserForCall.find(
        (u) => u.userOneBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
      }
      let isConnectTwo = connectedUserForCall.find(
        (u) => u.userTwoBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
      }
      uu['connectStatus'] = tempObj;
    });
    return uniqueUsers;
  }
  async getOnlineMembers(userBasicId: string, onlineUserIds: string[]) {
    return this.userService.getOnlineMembers(userBasicId, onlineUserIds);
  }

  async getPremiumMembers(userBasicId: string) {
    const result = await this.userService.getPremiumMembers(userBasicId);
    console.log('result', result);
    let uniqueUsers = [];
    result.forEach((r: { id: any }) => {
      let dup = uniqueUsers.find((re: { id: any }) => re.id == r.id);
      if (_.isEmpty(dup)) {
        uniqueUsers.push(r);
      }
    });
    const connectUsers =
      await this.connectService.getUserRequestStatusForAppPrefAndFilter(
        userBasicId,
      );
    console.log('connectUsers', connectUsers);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isLiked: false,
        sent: false,
        requested: false,
        isConnected: false,
        id: '',
      };
      let requiredObj = {};
      let isConnectOne = connectUsers.find(
        (u) => u.requestedUserBasicId == uu.id,
      );
      // console.log(isConnectOne);

      if (isConnectOne != null) {
        (tempObj.isLiked = true),
          (tempObj.requested = true),
          (tempObj.isConnected =
            isConnectOne.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectOne.id;
        requiredObj = isConnectOne;
      }
      let isConnectTwo = connectUsers.find(
        (u) => u.requestingUserBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isLiked = true),
          (tempObj.sent = true),
          (tempObj.isConnected =
            isConnectTwo.userRequestState == UserRequestState.Active
              ? true
              : false);
        tempObj.id = isConnectTwo.id;
        requiredObj = isConnectTwo;
      }
      uu['interestStatus'] = tempObj;
      uu['UserRequestStatus'] = requiredObj;
    });

    // Get connect requestUser for call and message
    const connectedUserForCall =
      await this.connectService.getUserConnectRequestsByUserId(userBasicId);
    uniqueUsers.forEach((uu) => {
      let tempObj = {
        isConnected: false,
        id: null,
      };
      let isConnectOne = connectedUserForCall.find(
        (u) => u.userOneBasicId == uu.id,
      );
      if (isConnectOne != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
      }
      let isConnectTwo = connectedUserForCall.find(
        (u) => u.userTwoBasicId == uu.id,
      );
      if (isConnectTwo != null) {
        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
      }
      uu['connectStatus'] = tempObj;
    });
    return uniqueUsers;
  }
  async blockProfile(block_who: string, block_whom: string) {
    const ucl = UserBlock.createUserBlock(block_who, block_whom);
    return await this.userService.blockProfile(ucl);
  }
  async unBlockUser(id: string) {
    // const ucl = UserBlock.createUserBlock(block_who, block_whom);
    return await this.userService.unBlockUser(id);
  }
  async getBlockedUsers(id: string) {
    // const ucl = UserBlock.createUserBlock(block_who, block_whom);

    let listOfBLockedUsers = await this.userService.getBlockedUsers(id);
    let userList = [];
    let user;
    // listOfBLockedUsers.forEach(async (e) => {
    //   user = await this.userService.getUserById(e.block_who);
    //   userList.push(user);
    // });
    let generatedResponse = [];
    await Promise.all(
      listOfBLockedUsers.map(async (elem, i) => {
        try {
          // here candidate data is inserted into
          let insertResponse = await this.userService.getUserById(
            elem.block_whom,
          );
          // and response need to be added into final response array
          listOfBLockedUsers[i]['block_user_details'] = insertResponse;
          generatedResponse.push(insertResponse);
        } catch (error) {
          console.log('error' + error);
        }
      }),
    );
    return await listOfBLockedUsers;
  }
  async getBlockedUsersForAll(id: string) {
    // const ucl = UserBlock.createUserBlock(block_who, block_whom);
    return await this.userService.getBlockedUsersForAll(id);
  }
}
