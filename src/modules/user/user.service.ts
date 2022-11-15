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

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.Habit,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.Religion,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
    return await this.userRepo.createUserHabit(userHabit);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.BioWithImages,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.FamilyDetail,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.FamilyBackground,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.Career,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
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
    const updatedUserBasic = userBasic.updateRegistrationStep(
      RegistrationSteps.Preferences,
    );
    this.userRepo.updateUserBasic(updatedUserBasic);
    this.userRepo.createUserImages(userImages);
    return await this.userRepo.createUserBio(userBio);
  }
  async updateUserBioWithDocs(
    userBasic: UserBasic,
    createUserBioImageDto: UpdateUserDocsDto,
  ) {
    const userImages = [];
    // By default the first image would be the display image
    let isDefaultImage = true;
    createUserBioImageDto.userDocs.forEach((ui) => {
      const userImage = UserDocs.createUserDocs(
        ui.imageUrl,
        isDefaultImage,
        userBasic,
      );
      userImages.push(userImage);
      isDefaultImage = false;
    });
    // const userBio = UserBio.createUserBio(
    //   createUserBioImageDto.aboutMe,
    //   userBasic,
    // );
    // const updatedUserBasic = userBasic.updateRegistrationStep(
    //   RegistrationSteps.Preferences,
    // );
    // this.userRepo.updateUserBasic(updatedUserBasic);
    // this.userRepo.createUserImages(userImages);
    return await this.userRepo.updateUserImages(userImages);
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
}
