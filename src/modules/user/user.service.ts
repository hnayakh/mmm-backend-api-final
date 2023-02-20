import { Injectable } from '@nestjs/common';
import {
  ProfileUpdationStatus,
  RegistrationSteps,
} from 'src/shared/enums/miscellaneous.enum';
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
import { AdminUser } from './entities/admin-user.entity';
import { Otp } from './entities/otp.entity';
import { UserAbout } from './entities/user-about.entity';
import { UserBasic } from './entities/user-basic.entity';
import { UserBio } from './entities/user-bio.entity';
import { UserCareer } from './entities/user-career.entity';
import { UserDocs } from './entities/user-docs.entity';
import { UserFamilyBackground } from './entities/user-family-background.entity';
import { UserFamilyDetail } from './entities/user-family-detail.entity';
import { UserHabit } from './entities/user-habit.entity';
import { UserImage } from './entities/user-image.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserReligion } from './entities/user-religion.entity';
import { UserRepo } from './user.repo';
import firebaseAdmin from 'firebase-admin';
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from 'agora-access-token';
import * as FIREBASE_SERVICE_ACCOUNT from '../auth/firebaseServiceAccount.json';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserLifestyleDto } from './dtos/create-user-lifestyle.dto';
import { UserLifestyle } from './entities/user-lifestyle.entity';
import { CreateUserHobbiesDto } from './dtos/create-user-hobbies.dto';
import { UserHobbies } from './entities/user-hobbies.entity';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>, // private readonly notificationRepo:Notification
  ) {}

  async getAllUsers(skip: string, take: string) {
    return await this.userRepo.getAllUsers(skip, take);
  }

  async getUsersByIds(userBasicIds: string[]) {
    return await this.userRepo.getUsersByIds(userBasicIds);
  }

  async createUserBasic(createUserBasicDto: CreateUserBasicDto) {
    const userBasic = UserBasic.createUserBasic(
      createUserBasicDto.email,
      createUserBasicDto.gender,
      createUserBasicDto.countryCode,
      createUserBasicDto.phoneNumber,
      createUserBasicDto.password,
      createUserBasicDto.relationship,
      createUserBasicDto.fireBaseToken,
    );
    return await this.userRepo.createUserBasic(userBasic);
  }

  async getUserBasicById(userBasicId: string) {
    return await this.userRepo.getUserBasicById(userBasicId);
  }

  async createUserAbout(
    userBasic: UserBasic,
    createUserAboutDto: CreateUserAboutDto,
  ) {
    const userAbout = UserAbout.createUserAbout(
      createUserAboutDto.name,
      createUserAboutDto.dateOfBirth,
      createUserAboutDto.maritalStatus,
      createUserAboutDto.childrenStatus,
      createUserAboutDto.abilityStatus,
      createUserAboutDto.height,
      userBasic,
      createUserAboutDto.numberOfChildren,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.About,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserAbout(userAbout);
  }

  async createUserHabit(
    userBasic: UserBasic,
    createUserHabitDto: CreateUserHabitDto,
  ) {
    const userHabit = UserHabit.createUserHabit(
      createUserHabitDto.eatingHabit,
      createUserHabitDto.smokingHabit,
      createUserHabitDto.drinkingHabit,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Religion,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserHabit(userHabit);
  }

  async createUserLifestyle(
    userBasic: UserBasic,
    createUserLifestyleDto: CreateUserLifestyleDto,
  ) {
    const userLifestyle = UserLifestyle.createUserLifestyle(
      createUserLifestyleDto.lifestyle,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Religion,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserLifestyle(userLifestyle);
  }
  async createUserHobbies(
    userBasic: UserBasic,
    createUserHobbiesDto: CreateUserHobbiesDto,
  ) {
    const userHobbies = UserHobbies.createUserLifestyle(
      createUserHobbiesDto.hobbies,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Religion,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserHobbies(userHobbies);
  }

  async createUserFamilyDetail(
    userBasic: UserBasic,
    createUserFamilyDDto: CreateUserFamilyDDto,
  ) {
    const ufd = UserFamilyDetail.createUserFamilyDetail(
      createUserFamilyDDto.fatherOccupation,
      createUserFamilyDDto.motherOccupation,
      createUserFamilyDDto.numberOfBrothers,
      createUserFamilyDDto.marriedNumberOfBrothers,
      createUserFamilyDDto.numberOfSisters,
      createUserFamilyDDto.marriedNumberOfSisters,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.BioWithImages,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);

    return await this.userRepo.createUserFamilyDetail(ufd);
  }

  async createUserFamilyBackground(
    userBasic: UserBasic,
    createUserFamilyBgDto: CreateUserFamilyBgDto,
  ) {
    const ufbg = UserFamilyBackground.createUserFamilyBackground(
      createUserFamilyBgDto.familyStatus,
      createUserFamilyBgDto.familyValues,
      createUserFamilyBgDto.familyType,
      createUserFamilyBgDto.country,
      createUserFamilyBgDto.state,
      createUserFamilyBgDto.city,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.FamilyDetail,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserFamilyBackground(ufbg);
  }

  async createUserCareer(
    userBasic: UserBasic,
    createUserCareerDto: CreateUserCareerDto,
  ) {
    const userCareer = UserCareer.createUserCareer(
      createUserCareerDto.employedIn,
      createUserCareerDto.occupation,
      createUserCareerDto.annualIncome,
      createUserCareerDto.highestEducation,
      createUserCareerDto.country,
      createUserCareerDto.state,
      createUserCareerDto.city,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.FamilyBackground,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserCareer(userCareer);
  }

  async createUserReligion(
    userBasic: UserBasic,
    createUserReligionDto: CreateUserReligionDto,
  ) {
    const userReligion = UserReligion.createUserReligion(
      createUserReligionDto.religion,
      createUserReligionDto.cast,
      createUserReligionDto.gothra,
      createUserReligionDto.motherTongue,
      createUserReligionDto.isManglik,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Career,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.updateUserBasic(userBasic);
    return await this.userRepo.createUserReligion(userReligion);
  }

  async createUserBioWithImages(
    userBasic: UserBasic,
    createUserBioImageDto: CreateUserBioImageDto,
  ) {
    const userImages = [];
    // By default the first image would be the display image
    let isDefaultImage = true;
    createUserBioImageDto.userImages.forEach((ui) => {
      const userImage = UserImage.createUserImage(
        ui.imageUrl,
        isDefaultImage,
        userBasic,
      );
      userImages.push(userImage);
      isDefaultImage = false;
    });
    const userBio = UserBio.createUserBio(
      createUserBioImageDto.aboutMe,
      userBasic,
    );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Preferences,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    console.log('userImages');
    this.userRepo.createUserImages(userImages);
    return await this.userRepo.createUserBio(userBio);
  }

  async updateUserBioWithDocs(
    userBasic: UserBasic,
    createUserBioImageDto: UpdateUserDocsDto,
  ) {
    const userImages = [];
    // By default the first image would be the display image
    // let isDefaultImage = true;
    console.log('Hello outside Doc', createUserBioImageDto.userDocImages);

    createUserBioImageDto.userDocImages.forEach((ui) => {
      console.log('Hello Doc', userBasic);
      const userImage = UserDocs.createUserDocs(
        ui.imageUrl,
        //  ui.idProof,
        // isDefaultImage,
        userBasic,
      );
      userImages.push(userImage);

      //  isDefaultImage = false;
    });
    const userBio = UserBio.createUserDocBio(createUserBioImageDto.idProof);
    this.userRepo.updateUserImages(userImages);
    return await this.userRepo.createUserBio(userBio);
  }

  async getUserBasicByEmail(email: string) {
    return await this.userRepo.getUserBasicByEmail(email);
  }

  async getUserBasicByPhone(phoneNumber: string) {
    return await this.userRepo.getUserBasicByPhone(phoneNumber);
  }

  async createUserLogin(
    deviceType: string,
    deviceId: string,
    authToken: string,
    userBasic: UserBasic,
  ) {
    const userLogin = UserLogin.createUserLoginRecord(
      deviceType,
      deviceId,
      authToken,
      userBasic,
    );
    return await this.userRepo.createUserLoginRecord(userLogin);
  }

  async createOtp(email: string, phoneNumber: string, otp: string) {
    const otpObj = Otp.createOtp(phoneNumber, email, otp);
    return await this.userRepo.createOtp(otpObj);
  }

  async updateOtpStatus(phoneNumber: string, email: string, otp: string) {
    const otpObj = await this.getOtpForVerification(phoneNumber, email);
    otpObj.updateStatus();
    return await this.userRepo.updateOtpStatus(otpObj);
  }

  async getOtpForVerification(phoneNumber: string, email: string) {
    return await this.userRepo.getOtpForVerification(phoneNumber, email);
  }

  // This it to get user details including all the child irrespective of their status.
  async getUserById(userBasicId: string) {
    return await this.userRepo.getUserById(userBasicId);
  }

  async updateUserBasic(user: UserBasic) {
    await this.userRepo.updateUserBasic(user);
  }
  async updateTokenToUserBasic(fireBaseToken: string, id: string) {
    await this.userRepo.updateToken(fireBaseToken, id);
  }

  async updateUserAboutStatus(
    userAbout: UserAbout,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserAbout = userAbout.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserAbout(updatedUserAbout);
  }

  async updateUserHabitStatus(
    userHabit: UserHabit,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserHabit = userHabit.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserHabit(updatedUserHabit);
  }

  async updateUserReligionStatus(
    userReligion: UserReligion,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserReligion = userReligion.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserReligion(updatedUserReligion);
  }

  async updateUserCareerStatus(
    userCareer: UserCareer,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserCareer = userCareer.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserCareer(updatedUserCareer);
  }

  async updateUserFamilyBackgroundStatus(
    userFamilyBackground: UserFamilyBackground,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserFamilyBackground =
      userFamilyBackground.updateProfileUpdationStatus(profileUpdationStatus);
    return await this.userRepo.updateUserFamilyBackground(
      updatedUserFamilyBackground,
    );
  }

  async updateUserFamilyDetailStatus(
    ufd: UserFamilyDetail,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserFamilyDetail = ufd.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserFamilyDetail(updatedUserFamilyDetail);
  }

  async updateUserBioStatus(
    userBio: UserBio,
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    const updatedUserBio = userBio.updateProfileUpdationStatus(
      profileUpdationStatus,
    );
    return await this.userRepo.updateUserBio(updatedUserBio);
  }

  async updateUserImageStatus(
    userImages: UserImage[],
    profileUpdationStatus: ProfileUpdationStatus,
  ) {
    let updatedUserImages = [];
    userImages.forEach((ui) => {
      const updatedUserImage = ui.updateProfileUpdationStatus(
        profileUpdationStatus,
      );
      updatedUserImages.push(updatedUserImage);
    });
    return await this.userRepo.updateUserImages(updatedUserImages);
  }

  async getUserGenderById(userBasicId: string) {
    return await this.userRepo.getUserGenderById(userBasicId);
  }

  async getUserGenderAndPreference(userBasicId: string) {
    return await this.userRepo.getUserGenderAndPreference(userBasicId);
  }

  async getProfilesByPreference(queryString: string) {
    return await this.userRepo.getProfilesByPreference(queryString);
  }

  async getAdminUsers() {
    return this.userRepo.getAdminUsers();
  }

  async getAdminUserByEmail(email: string) {
    return this.userRepo.getAdminUserByEmail(email);
  }

  async createAdminUser(createAdminUserDto: CreateAdminUserDto) {
    const adminUser = AdminUser.createAdminUser(
      createAdminUserDto.firstName,
      createAdminUserDto.lastName,
      createAdminUserDto.email,
      createAdminUserDto.gender,
      createAdminUserDto.phoneNumber,
      createAdminUserDto.password,
      createAdminUserDto.role,
    );
    return this.userRepo.createAdminUser(adminUser);
  }
  async updateAdminUser(adminUser: AdminUser) {
    return this.userRepo.updateAdminUser(adminUser);
  }

  async createUserPreference(
    userBasic: UserBasic,
    cupd: CreateUserPreferenceDto,
  ) {
    const userPreference = UserPreference.createPreference(
      cupd.minAge,
      cupd.maxAge,
      cupd.minHeight,
      cupd.maxHeight,
      JSON.stringify(cupd.maritalStatus),
      JSON.stringify(cupd.country),
      JSON.stringify(cupd.state),
      JSON.stringify(cupd.city),
      JSON.stringify(cupd.religion),
      JSON.stringify(cupd.caste),
      JSON.stringify(cupd.motherTongue),
      JSON.stringify(cupd.highestEducation),
      JSON.stringify(cupd.occupation),
      JSON.stringify(cupd.maxIncome),
      JSON.stringify(cupd.minIncome),
      JSON.stringify(cupd.dietaryHabits),
      JSON.stringify(cupd.drinkingHabits),
      JSON.stringify(cupd.smokingHabits),
      JSON.stringify(cupd.challenged),
      userBasic,
    );
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.PendingVerification,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
    return await this.userRepo.createUserPreference(userPreference);
  }

  async getUserPartnerPreferences(userBasicId: string) {
    return await this.userRepo.getUserPreferenceByUserId(userBasicId);
  }

  async getAllUserDetailsById(userBasicId: string) {
    return await this.userRepo.getAllUserDetailsById(userBasicId);
  }

  async getRequiredLoginDetails(userBasicId: string) {
    return await this.userRepo.getRequiredLoginDetails(userBasicId);
  }

  async getAppUsersForAdmin(quesryString: string) {
    return await this.userRepo.getAppUsersForAdmin(quesryString);
  }
  async visitedProfile(visitedBy: string, visitedTo: string) {
    const userVisitedBy = await this.getUserById(visitedBy);
    const userVisitedTo = await this.getUserById(visitedTo);
    return await this.userRepo.visitedProfile(userVisitedBy, userVisitedTo);
  }
  async getMatchPercentage(userBasicId: String, otherUserBasicId: String) {
    return await this.userRepo.getMatchPercentage(
      userBasicId,
      otherUserBasicId,
    );
  }
  async recentProfileViews(userBasicId: string) {
    return await this.userRepo.getRecentViews(userBasicId);
  }
  async getProifleVisitedBy(userBasicId: string) {
    return await this.userRepo.getProifleVisitedBy(userBasicId);
  }
  async getOnlineMembers(userBasicId: string) {
    return await this.userRepo.getOnlineMembers(userBasicId);
  }

  async getPremiumMembers(userBaicId: string) {
    return await this.userRepo.getPremiumMembers(userBaicId);
  }
  async blockProfile(ucl) {
    return await this.userRepo.blockProfile(ucl);
  }
  async unBlockUser(id: string) {
    return await this.userRepo.unBlockUser(id);
  }
  async getBlockedUsers(id: string) {
    return await this.userRepo.getBlockedUsers(id);
  }
  async getBlockedUsersForAll(id: string) {
    return await this.userRepo.getBlockedUsersForAll(id);
  }
  async checkIfBlocked(myBasicId: string, userBasicId: string) {
    return await this.userRepo.checkIfBlocked(myBasicId, userBasicId);
  }

  async generateAGoraToken(data: any) {
    console.log('check');
    const firebase_params = {
      type: FIREBASE_SERVICE_ACCOUNT.type,
      projectId: FIREBASE_SERVICE_ACCOUNT.project_id,
      privateKeyId: FIREBASE_SERVICE_ACCOUNT.private_key_id,
      privateKey: FIREBASE_SERVICE_ACCOUNT.private_key,
      clientEmail: FIREBASE_SERVICE_ACCOUNT.client_email,
      clientId: FIREBASE_SERVICE_ACCOUNT.client_id,
      authUri: FIREBASE_SERVICE_ACCOUNT.auth_uri,
      tokenUri: FIREBASE_SERVICE_ACCOUNT.token_uri,
      authProviderX509CertUrl:
        FIREBASE_SERVICE_ACCOUNT.auth_provider_x509_cert_url,
      clientC509CertUrl: FIREBASE_SERVICE_ACCOUNT.client_x509_cert_url,
    };

    console.log('firebase');
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebase_params),
        // databaseURL: process.env.FIREBASE_DB_URL
      });
    } else {
      firebaseAdmin.app(); // if already initialized, use that one
    }
    const APP_ID = '2408d5882f0445ec82566323785cfb66';
    const APP_CERTIFICATE = 'c18a5201243a44ebb6c3c95f124f9798';
    const { senderId, receiverId, callType } = data;
    console.log('here');
    let receiverData = await this.userRepo.getUserBasicById(receiverId);
    console.log(receiverData);
    if (!receiverData) {
      return 'Receiver Data not found';
    }
    if (receiverData) {
      const role = RtcRole.SUBSCRIBER;
      const expirationTimeInSeconds = 3600;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const channelName = receiverData.id.toString() + receiverData.email;
      const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
      let sender = await this.userRepo.getUserBasicById(senderId);
      if (!sender) {
        return {
          status: 0,
          message: 'Sender not found.',
        };
      }
      const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        0,
        role,
        privilegeExpiredTs,
      );
      const data = {
        agoraToken: token,
        channelName: channelName,
        notificationId: '',
        name: '',
        receiverId: '',
        profileImage: '',
        status: '',
      };

      const notificationCreated = await this.userRepo.createNotification({
        senderId: senderId,
        receiverId: receiverId,
        message: callType,
        status: 0,
      });

      // .createNotification({
      //   senderId: senderId,
      //   receiverId: receiverId,
      //   message:
      // });
      console.log(notificationCreated);
      console.log(sender);
      data.notificationId = notificationCreated.id.toString();
      data.name = sender.userAbouts[0].name;
      data.receiverId = receiverData.id;
      data.profileImage = sender.userImages[0].imageURL;
      data.status = 'calling';
      const payload = {
        notification: {
          title: callType + ' call',
          // body: 'body text here',
        },
        data: data,
      };

      const options = {
        priority: 'high',
        // timeToLive: 60 * 60 * 24, // 1 day
      };
      console.log('data before', data);
      if (receiverData.fireBaseToken) {
        let result = await firebaseAdmin
          .messaging()
          .sendToDevice(receiverData.fireBaseToken, payload, options);
        // .then(async function (r) {

        // })
        // .catch(function (error) {
        //   console.log('Error sending notification:', error);
        //   return { status: 0, Message: 'Error sending notification' };
        // });
        // return {
        //   firebaseResult: result,
        //   data: data,
        // };
        if (result.failureCount !== 0) {
          return { status: 0, message: result.results[0].error.message };
        } else {
          delete data.receiverId;
          delete data.status;
          // await Notification.updateOne(
          //   { _id: notificationCreated._id },
          //   { message: data },
          // );
          await this.userRepo.updateNotification({
            id: notificationCreated.id,
          });
          console.log('data after', data);
          return data;
        }
      } else {
        return { Message: 'Something went wrong' };
      }
    } else {
      return {
        status: 0,
        message: 'Receiver not found',
      };
    }
  }
}
