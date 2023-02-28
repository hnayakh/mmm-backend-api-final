import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { id, ta } from 'date-fns/locale';
import {
  ProfileUpdationStatus,
  RegistrationSteps,
} from 'src/shared/enums/miscellaneous.enum';
import { getManager, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from './entities/admin-user.entity';
import { Otp } from './entities/otp.entity';
import { UserAbout } from './entities/user-about.entity';
import { UserBasic } from './entities/user-basic.entity';
import { UserBio } from './entities/user-bio.entity';
import { UserCareer } from './entities/user-career.entity';
import { UserFamilyBackground } from './entities/user-family-background.entity';
import { UserFamilyDetail } from './entities/user-family-detail.entity';
import { UserHabit } from './entities/user-habit.entity';
import { UserImage } from './entities/user-image.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserReligion } from './entities/user-religion.entity';
import { ProfileVisit } from './entities/user.profile.visit';
import { UserService } from './user.service';
import { isArray } from 'lodash';
import { UserDocs } from './entities/user-docs.entity';
import { Notification } from './entities/notification.entity';
import { UserLifestyle } from './entities/user-lifestyle.entity';
import { UserHobbies } from './entities/user-hobbies.entity';
import { UserBlock } from './entities/block-user.entity';

@Injectable()
export class UserRepo {
  constructor(
    // @Inject(JwtService)
    private readonly jwtstategy: JwtService,
    @InjectRepository(UserBasic)
    private readonly userBasicRepo: Repository<UserBasic>,
    @InjectRepository(UserAbout)
    private readonly userAboutRepo: Repository<UserAbout>,
    @InjectRepository(UserHabit)
    private readonly userHabitRepo: Repository<UserHabit>,
    @InjectRepository(UserLifestyle)
    private readonly userLifestyleRepo: Repository<UserLifestyle>,
    @InjectRepository(UserHobbies)
    private readonly userHobbiesRepo: Repository<UserHobbies>,
    @InjectRepository(UserReligion)
    private readonly userReligionRepo: Repository<UserReligion>,
    @InjectRepository(UserCareer)
    private readonly userCareerRepo: Repository<UserCareer>,
    @InjectRepository(UserFamilyBackground)
    private readonly userFamilyBackgroundRepo: Repository<UserFamilyBackground>,
    @InjectRepository(UserFamilyDetail)
    private readonly userFamilyDetailRepo: Repository<UserFamilyDetail>,
    @InjectRepository(UserImage)
    private readonly userImageRepo: Repository<UserImage>,
    @InjectRepository(UserDocs)
    private readonly userDocRepo: Repository<UserDocs>,
    @InjectRepository(UserBio)
    private readonly userBioRepo: Repository<UserBio>,
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,
    @InjectRepository(UserLogin)
    private readonly userLoginRepo: Repository<UserLogin>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepo: Repository<AdminUser>,
    @InjectRepository(UserPreference)
    private readonly userPreferenceRepo: Repository<UserPreference>,
    @InjectRepository(UserBlock)
    private readonly userBlockRepo: Repository<UserBlock>,

    @InjectRepository(ProfileVisit)
    private readonly userProfileVisitRepo: Repository<ProfileVisit>,

    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async getAllUsers(skip: string, take: string) {
    return await this.userBasicRepo.find({
      relations: [
        'userBios',
        'userAbouts',
        // 'userHabits',
        // 'userReligions',
        // 'userCareers',
        // 'userFamilyBackgrounds',
        // 'userFamilyDetails',
        // 'userImages',
        // 'userLogins'
      ],
    });
  }

  async getUsersByIds(userBasicIds: string[]) {
    let tempQuery = `SELECT * FROM users_view_admin au WHERE au.id IN (`;
    userBasicIds.forEach((u) => {
      tempQuery += `'${u}',`;
    });
    let query = tempQuery.slice(0, -1);
    query += `);`;
    const entityManager = getManager();
    const users = await entityManager.query(query);
    return users;
  }

  async createUserBasic(userBasic: UserBasic) {
    return await this.userBasicRepo.save(userBasic);
  }

  async updateUserBasic(userBasic: UserBasic) {
    return await this.userBasicRepo.save({ ...userBasic });
  }
  async updateToken(fireBaseToken, id) {
    // const entityManager =
    // return await this.userBasicRepo.save({ ...userBasic });
    console.log('firebaseToken', fireBaseToken);
    const entityManager = getManager();
    const rawQuery = `UPDATE user_basics SET 
     fireBaseToken = '${fireBaseToken}'
     WHERE (id = '${id}');`;
    console.log(rawQuery);
    const faqUpdate = await entityManager.query(rawQuery);
    return faqUpdate;
  }

  async getUserBasicById(userBasicId: string) {
    return await this.userBasicRepo.findOne(userBasicId, {
      relations: [
        'userBios',
        'userAbouts',
        'userHabits',
        'userReligions',
        'userCareers',
        'userFamilyBackgrounds',
        'userFamilyDetails',
        'userImages',
        'userLogins',
      ],
    });
  }
  async getUserAboutyId(userBasicId: string) {
    return await this.userAboutRepo.findOne(userBasicId);
  }

  async createUserAbout(userAbout: UserAbout) {
    const existingPending = await this.userAboutRepo.findOne({
      where: {
        userBasic: userAbout.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userAboutRepo.save({ ...existingPending });
    }
    let existingAboutRecord = await this.userAboutRepo.findOne({
      where: {
        userBasic: userAbout.userBasic,
      },
    });
    console.log('existingAboutRecord', existingAboutRecord);
    let result;
    if (existingAboutRecord != null) {
      result = await this.updateUserAbout(userAbout);
    } else {
      const updatedUserBasic = userAbout.userBasic.updateRegistrationStep(
        RegistrationSteps.About,
      );
      result = await this.userAboutRepo.save(userAbout);
    }
    return result;
  }

  async updateUserAbout(userAbout: UserAbout) {
    // let userAboutData= this.userAboutRepo.findOne({
    //   where: { userBasic: userAbout.userBasic},
    // });
    console.log('updating...............');
    await this.userAboutRepo.update(
      { userBasic: userAbout.userBasic },
      { ...userAbout },
    );
    return userAbout;
  }

  // async createUserHabit(userHabit: UserHabit) {
  //   const existingPending = await this.userHabitRepo.findOne({
  //     where: {
  //       userBasic: userHabit.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userHabitRepo.save({ ...existingPending });
  //   }
  //   return await this.userHabitRepo.save(userHabit);
  // }
  async createUserHabit(userHabit: UserHabit) {
    const existingPending = await this.userHabitRepo.findOne({
      where: {
        userBasic: userHabit.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userHabitRepo.save({ ...existingPending });
    }
    let existingHabitRecord = await this.userHabitRepo.findOne({
      where: {
        userBasic: userHabit.userBasic,
      },
    });
    console.log('existingHabitRecord', existingHabitRecord);
    let result;
    if (existingHabitRecord != null) {
      result = await this.updateUserHabit(userHabit);
    } else {
      const updatedUserBasic = userHabit.userBasic.updateRegistrationStep(
        RegistrationSteps.Habit,
      );
      result = await this.userHabitRepo.save(userHabit);
    }
    return result;
    // return existingHabitRecord != null
    //   ? await this.updateUserHabit(userHabit)
    //   : await this.userHabitRepo.save(userHabit);
  }

  async updateUserHabit(userHabit: UserHabit) {
    //return await this.userHabitRepo.save({ ...userHabit });
    console.log('updating...............');
    await this.userHabitRepo.update(
      { userBasic: userHabit.userBasic },
      { ...userHabit },
    );
    return userHabit;
  }

  async createUserLifestyle(userLifestyle: UserLifestyle) {
    const existingPending = await this.userLifestyleRepo.findOne({
      where: {
        userBasic: userLifestyle.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userLifestyleRepo.save({ ...existingPending });
    }
    let existingLifestyleRecord = await this.userLifestyleRepo.findOne({
      where: {
        userBasic: userLifestyle.userBasic,
      },
    });
    console.log('existinglifeStyleRecord', existingLifestyleRecord);
    let result;
    if (existingLifestyleRecord != null) {
      result = await this.updateUserLifestyle(userLifestyle);
    } else {
      const updatedUserBasic = userLifestyle.userBasic.updateRegistrationStep(
        RegistrationSteps.Habit,
      );
      console.log('LIFE', userLifestyle);
      result = await this.userLifestyleRepo.save(userLifestyle);
    }
    return result;
    // return existingHabitRecord != null
    //   ? await this.updateUserHabit(userHabit)
    //   : await this.userHabitRepo.save(userHabit);
  }

  async updateUserLifestyle(userLifestyle: UserLifestyle) {
    //return await this.userHabitRepo.save({ ...userHabit });
    console.log('updating...............');
    await this.userLifestyleRepo.update(
      { userBasic: userLifestyle.userBasic },
      { ...userLifestyle },
    );
    return userLifestyle;
  }

  async createUserHobbies(userHobbies: UserHobbies) {
    const existingPending = await this.userHobbiesRepo.findOne({
      where: {
        userBasic: userHobbies.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userHobbiesRepo.save({ ...existingPending });
    }
    let existingHobbiesRecord = await this.userHobbiesRepo.findOne({
      where: {
        userBasic: userHobbies.userBasic,
      },
    });
    console.log('existingHobbiesRecord', existingHobbiesRecord);
    let result;
    if (existingHobbiesRecord != null) {
      result = await this.updateUserHobbies(userHobbies);
    } else {
      const updatedUserBasic = userHobbies.userBasic.updateRegistrationStep(
        RegistrationSteps.Habit,
      );
      console.log('LIFE', userHobbies);
      result = await this.userHobbiesRepo.save(userHobbies);
    }
    return result;
    // return existingHabitRecord != null
    //   ? await this.updateUserHabit(userHabit)
    //   : await this.userHabitRepo.save(userHabit);
  }

  async updateUserHobbies(userHobbies: UserHobbies) {
    //return await this.userHabitRepo.save({ ...userHabit });
    console.log('updating...............');

    await this.userHobbiesRepo.update(
      { userBasic: userHobbies.userBasic },
      { ...userHobbies },
    );
    console.log('Changing...............', userHobbies);
    return userHobbies;
  }

  // async updateUserHabit(userHabit: UserHabit) {
  //   return await this.userHabitRepo.save({ ...userHabit });
  // }

  // async createUserFamilyDetail(ufd: UserFamilyDetail) {
  //   const existingPending = await this.userFamilyDetailRepo.findOne({
  //     where: {
  //       userBasic: ufd.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userFamilyDetailRepo.save({ ...existingPending });
  //   }
  //   return await this.userFamilyDetailRepo.save(ufd);
  // }

  async createUserFamilyDetail(ufd: UserFamilyDetail) {
    const existingPending = await this.userFamilyDetailRepo.findOne({
      where: {
        userBasic: ufd.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userFamilyDetailRepo.save({ ...existingPending });
    }

    let existingFamilyDetailRecord = await this.userFamilyDetailRepo.findOne({
      where: {
        userBasic: ufd.userBasic,
      },
    });
    console.log('existingAboutRecord', existingFamilyDetailRecord);
    let result;
    if (existingFamilyDetailRecord != null) {
      result = await this.updateUserFamilyDetail(ufd);
    } else {
      const updatedUserBasic = ufd.userBasic.updateRegistrationStep(
        RegistrationSteps.FamilyDetail,
      );
      result = await this.userFamilyDetailRepo.save(ufd);
    }
    return result;
    // return existingFamilyDetailRecord != null
    //   ? this.updateUserFamilyDetail(ufd)
    //   : await this.userFamilyDetailRepo.save(ufd);
  }

  async updateUserFamilyDetail(ufd: UserFamilyDetail) {
    // return await this.userFamilyDetailRepo.save({ ...ufd });
    console.log('updating Family Details..................');
    await this.userFamilyDetailRepo.update(
      { userBasic: ufd.userBasic },
      { ...ufd },
    );
    return ufd;
  }

  // async updateUserFamilyDetail(ufd: UserFamilyDetail) {
  //   return await this.userFamilyDetailRepo.save({ ...ufd });
  // }

  async createUserFamilyBackground(ufbg: UserFamilyBackground) {
    const existingPending = await this.userFamilyBackgroundRepo.findOne({
      where: {
        userBasic: ufbg.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userFamilyBackgroundRepo.save({ ...existingPending });
    }

    let existingFamilyBackgroundRecord =
      await this.userFamilyBackgroundRepo.findOne({
        where: {
          userBasic: ufbg.userBasic,
        },
      });
    console.log('existingAboutRecord', existingFamilyBackgroundRecord);
    let result;
    if (existingFamilyBackgroundRecord != null) {
      result = await this.updateUserFamilyBackground(ufbg);
    } else {
      const updatedUserBasic = ufbg.userBasic.updateRegistrationStep(
        RegistrationSteps.FamilyBackground,
      );
      result = await this.userFamilyBackgroundRepo.save(ufbg);
    }
    return result;
    // return existingFamilyBackgroundRecord != null
    //   ? this.updateUserFamilyBackground(ufbg)
    //   : await this.userFamilyBackgroundRepo.save(ufbg);
  }

  // async createUserFamilyBackground(ufbg: UserFamilyBackground) {
  //   const existingPending = await this.userFamilyBackgroundRepo.findOne({
  //     where: {
  //       userBasic: ufbg.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userFamilyBackgroundRepo.save({ ...existingPending });
  //   }
  //   return await this.userFamilyBackgroundRepo.save(ufbg);
  // }

  async updateUserFamilyBackground(ufbg: UserFamilyBackground) {
    // return await this.userFamilyDetailRepo.save({ ...ufd });
    console.log('updating Backgrround Details..................');
    await this.userFamilyBackgroundRepo.update(
      { userBasic: ufbg.userBasic },
      { ...ufbg },
    );
    return ufbg;
  }

  // async updateUserFamilyBackground(ufbg: UserFamilyBackground) {
  //   return await this.userFamilyBackgroundRepo.save({ ...ufbg });
  // }

  async createUserCareer(userCareer: UserCareer) {
    const existingPending = await this.userCareerRepo.findOne({
      where: {
        userBasic: userCareer.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userCareerRepo.save({ ...existingPending });
    }
    let existingCareerRecord = await this.userCareerRepo.findOne({
      where: {
        userBasic: userCareer.userBasic,
      },
    });
    console.log('existingCarrerRecord', existingCareerRecord);
    let result;
    if (existingCareerRecord != null) {
      result = await this.updateUserCareer(userCareer);
    } else {
      const updatedUserBasic = userCareer.userBasic.updateRegistrationStep(
        RegistrationSteps.Career,
      );
      result = await this.userCareerRepo.save(userCareer);
    }
    return result;
  }

  // async createUserCareer(userCareer: UserCareer) {
  //   const existingPending = await this.userCareerRepo.findOne({
  //     where: {
  //       userBasic: userCareer.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userCareerRepo.save({ ...existingPending });
  //   }
  //   return await this.userCareerRepo.save(userCareer);
  // }

  async updateUserCareer(userCareer: UserCareer) {
    // let userAboutData= this.userAboutRepo.findOne({
    //   where: { userBasic: userAbout.userBasic},
    // });
    console.log('updating...............');
    await this.userCareerRepo.update(
      { userBasic: userCareer.userBasic },
      { ...userCareer },
    );
    return userCareer;
  }

  // async updateUserCareer(userCareer: UserCareer) {
  //   return await this.userCareerRepo.save({ ...userCareer });
  // }

  async createUserReligion(userReligion: UserReligion) {
    const existingPending = await this.userReligionRepo.findOne({
      where: {
        userBasic: userReligion.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userReligionRepo.save({ ...existingPending });
    }
    let existingReligionRecord = await this.userReligionRepo.findOne({
      where: {
        userBasic: userReligion.userBasic,
      },
    });
    console.log('existingCarrerRecord', existingReligionRecord);
    let result;
    if (existingReligionRecord != null) {
      result = await this.updateUserReligion(userReligion);
    } else {
      const updatedUserBasic = userReligion.userBasic.updateRegistrationStep(
        RegistrationSteps.Religion,
      );
      result = await this.userReligionRepo.save(userReligion);
    }
    return result;
  }

  // async createUserReligion(userReligion: UserReligion) {
  //   const existingPending = await this.userReligionRepo.findOne({
  //     where: {
  //       userBasic: userReligion.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userReligionRepo.save({ ...existingPending });
  //   }
  //   return await this.userReligionRepo.save(userReligion);
  // }

  async updateUserReligion(userReligion: UserReligion) {
    // let userAboutData= this.userAboutRepo.findOne({
    //   where: { userBasic: userAbout.userBasic},
    // });
    console.log('updating...............');
    await this.userReligionRepo.update(
      { userBasic: userReligion.userBasic },
      { ...userReligion },
    );
    return userReligion;
  }

  // async updateUserReligion(userReligion: UserReligion) {
  //   return await this.userReligionRepo.save({ ...userReligion });
  // }

  // async createUserBio(userBio: UserBio) {
  //   const existingPending = await this.userBioRepo.findOne({
  //     where: {
  //       userBasic: userBio.userBasic,
  //       profileUpdationStatus: ProfileUpdationStatus.Pending,
  //     },
  //   });
  //   if (existingPending != null) {
  //     // Special scenario for multiple updates before verification.
  //     existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
  //     this.userBioRepo.save({ ...existingPending });
  //   }
  //   return await this.userBioRepo.save(userBio);
  // }

  async createUserBio(userBio: UserBio) {
    const existingPending = await this.userBioRepo.findOne({
      where: {
        userBasic: userBio.userBasic,
        profileUpdationStatus: ProfileUpdationStatus.Pending,
      },
    });
    if (existingPending != null) {
      // Special scenario for multiple updates before verification.
      existingPending.profileUpdationStatus = ProfileUpdationStatus.Archived;
      this.userBioRepo.save({ ...existingPending });
    }
    let existingBioRecord = await this.userBioRepo.findOne({
      where: {
        userBasic: userBio.userBasic,
      },
    });
    console.log('existingBioRecord', existingBioRecord);
    let result;
    if (existingBioRecord != null) {
      result = await this.updateUserBio(userBio);
    } else {
      const updatedUserBasic = userBio.userBasic.updateRegistrationStep(
        RegistrationSteps.BioWithImages,
      );
      result = await this.userBioRepo.save(userBio);
    }
    return result;
  }

  async updateUserBio(userBio: UserBio) {
    // let userAboutData= this.userAboutRepo.findOne({
    //   where: { userBasic: userAbout.userBasic},
    // });
    console.log('updating...............');
    await this.userBioRepo.update(
      { userBasic: userBio.userBasic },
      { ...userBio },
    );
    return userBio;
  }

  // async updateUserBio(userBio: UserBio) {
  //  // return await this.userBioRepo.save({ ...userBio });
  // }

  async createUserImages(userImages: UserImage[]) {
    return await this.userImageRepo.save(userImages);
  }
  async createUserDocs(userImages: UserDocs[]) {
    return await this.userImageRepo.save(userImages);
  }

  async updateUserImages(userDocRepo: UserDocs[]) {
    return await this.userDocRepo.save({ ...userDocRepo });
  }

  async getUserBasicByEmail(email: string) {
    return await this.userBasicRepo.findOne({ where: { email: email } });
  }

  // This it to get user details including all the child irrespective of their status.
  async getUserById(userBasicId: string) {
    return await this.userBasicRepo.findOne({
      where: {
        id: userBasicId,
      },
      relations: [
        'userBios',
        'userAbouts',
        'userHabits',
        'userReligions',
        'userCareers',
        'userFamilyBackgrounds',
        'userFamilyDetails',
        'userImages',
      ],
    });
  }

  async getUserBasicByPhone(phoneNumber: string) {
    const res = await this.userBasicRepo.findOne({
      where: { phoneNumber: phoneNumber },
    });
    return res;
  }

  async createUserLoginRecord(userLogin: UserLogin) {
    const userLoginObj = await this.userLoginRepo.findOne({
      where: {
        userBasic: userLogin.userBasic,
        isActive: true,
      },
    });
    if (userLoginObj) {
      userLoginObj.deactivate();
      this.userLoginRepo.save({ ...userLoginObj });
    } else return await this.userLoginRepo.save(userLogin);
  }
  async createOtp(otpObj: Otp) {
    const otp = await this.otpRepo.findOne({
      where: {
        phoneNumber: otpObj.phoneNumber,
        isActive: true,
      },
    });
    if (otp) {
      otp.deactivate();
      this.otpRepo.save({ ...otp });
    }
    return await this.otpRepo.save(otpObj);
  }
  async updateOtpStatus(otpObj: Otp) {
    return await this.otpRepo.save({ ...otpObj });
  }

  async getOtpForVerification(phoneNumber: string, email: string) {
    if (phoneNumber != null) {
      const otp = await this.otpRepo.findOne({
        where: {
          phoneNumber: phoneNumber,
          isActive: true,
        },
      });
      return otp;
    } else {
      const otp = await this.otpRepo.findOne({
        where: {
          email: email,
          isActive: true,
        },
      });
      return otp;
    }
  }

  async getUserGenderById(userBasicId: string) {
    const entityManager = getManager();
    const rawQuery = `SELECT id,
                      gender FROM user_basics ub
                      WHERE ub.id = '${userBasicId}';`;
    const user = await entityManager.query(rawQuery);
    return user[0].gender;
  }

  async getUserGenderAndPreference(userBasicId: string) {
    const entityManager = getManager();
    const rawQuery = `SELECT up.userBasicId,
                      ub.gender,
                      up.minAge,
                      up.maxAge,
                      up.minHeight,
                      up.maxHeight,
                      up.maritalStatus,
                      up.country,
                      up.state,
                      up.city,
                      up.religion,
                      up.caste,
                      up.motherTongue,
                      up.highestEducation,
                      up.occupation,
                      up.dietaryHabits,
                      up.drinkingHabits,
                      up.smokingHabits,
                      up.challenged,
                      up.maxIncome,
                      up.minIncome,
                      ub.activationStatus
                      from user_basics ub
                      left join user_preferences up
                      on up.userBasicId = ub.id
                      WHERE up.userBasicId = '${userBasicId}'`;
    const users = await entityManager.query(rawQuery);
    return users[0];
  }

  async getAppUsersForAdmin(queryString: string) {
    const entityManager = getManager();
    // const rawQuery = `SELECT * FROM users_view uv ORDER BY uv.createdAt DESC;`;
    console.log('queryString', queryString);
    const users = await entityManager.query(queryString);
    return users;
  }

  async getProfilesByPreference(queryString: string) {
    const entityManager = getManager();
    const profiles = await entityManager.query(queryString);
    return profiles;
  }

  async createAdminUser(adminUser: AdminUser) {
    return this.adminUserRepo.save(adminUser);
  }
  async updateAdminUser(adminUser: AdminUser) {
    console.log('admin user', adminUser);
    const entityManager = getManager();
    const rawQuery = `UPDATE admin_users SET isActive = ${adminUser.isActive} WHERE (id = '${adminUser.id}');`;
    console.log('rawQuery', rawQuery);
    const userDet = await entityManager.query(rawQuery);
    return userDet;
  }
  async getAdminUsers() {
    return this.adminUserRepo.find({
      where: {
        isActive: true,
      },
    });
  }

  async getAdminUserByEmail(email: string) {
    return this.adminUserRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUserPreference(userPreference: UserPreference) {
    return await this.userPreferenceRepo.save(userPreference);
  }

  async visitedProfile(visitedBy: UserBasic, visitedTo: UserBasic) {
    const profileVisit = ProfileVisit.createVisit(visitedBy, visitedTo);
    return await this.userProfileVisitRepo.save(profileVisit);
  }

  async getAllUserDetailsById(userBasicId: string) {
    return await this.userBasicRepo.findOne({
      where: {
        id: userBasicId,
      },
      relations: [
        'userBios',
        'userAbouts',
        'userHabits',
        'userReligions',
        'userCareers',
        'userFamilyBackgrounds',
        'userFamilyDetails',
        'userImages',
        'userHobbies',
        'userLifestyle',
      ],
    });
  }

  async getRequiredLoginDetails(userBasicId: string) {
    const entityManager = getManager();
    const rawQuery = `SELECT uv.relationship,
                      uv.name,
                      uv.dateOfBirth,
                      uv.height,
                      uv.maritalStatus,
                      uv.careerCountry,
                      uv.careerCountryId,
                      uv.religion,
                      uv.abilityStatus,
                      uv.motherTongue 
                      FROM users_view_admin uv
                      WHERE uv.id = '${userBasicId}';`;
    const userDet = await entityManager.query(rawQuery);
    const jwtToken = this.jwtstategy.sign({
      username: userDet.name,
      sub: userBasicId,
    });
    userDet.jwt = jwtToken;
    return userDet;
  }

  async getUserPreferenceByUserId(userBasicId: string) {
    // return await this.userPreferenceRepo.findOne({
    //   where: {
    //     userBasic: userBasicId,
    //   },
    // });
    // // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // // return result;
    // // const result = await this.userBasicRepo.find()
    // const entityManager = getManager();
    // const rawQuery = `select *
    // from user_preferences
    // WHERE isActive=1
    // and userBasicId = '${userBasicId}'`;
    // const userDet = await entityManager.query(rawQuery);
    // return userDet;

    const entityManager = getManager();
    const rawQuery = `SELECT up.userBasicId, up.minAge, up.maxAge, up.minHeight, up.maxHeight, up.maritalStatus, up.country,
    up.state,up.city, up.religion, up.caste, up.motherTongue, up.highestEducation, up.
    occupation, up.dietaryHabits, up.drinkingHabits, up.smokingHabits, up.challenged, up.maxIncome, up.minIncome ,up.createdAt
    FROM user_preferences up
    where up.userBasicId= '${userBasicId}' ORDER by up.createdAt DESC`;

    const userDet = await entityManager.query(rawQuery);

    console.log('userDet', userDet);
    let userPreferenc: UserPreference = new UserPreference();

    if (userDet.length > 0) {
      // userDet.forEach((record) => {
      Object.keys(userDet[0]).forEach((key) => {
        console.log('key', key);
        let recordValue =
          userDet[0][key].toString().indexOf('[') == 0
            ? String(JSON.parse(userDet[0][key]))
            : userDet[0][key];
        console.log('recordValue', recordValue);
        if (key != 'userBasicId' && userPreferenc[key] != recordValue) {
          if (userPreferenc[key]) {
            if (
              userPreferenc[key].length &&
              userPreferenc[key].split(',').indexOf(recordValue) == -1
            ) {
              userPreferenc[key] = userPreferenc[key] + ',' + recordValue;
            }
          } else {
            userPreferenc[key] = recordValue;
          }
        }
      });
      // });
    }

    console.log('userDet3', userDet);
    return userPreferenc;
  }

  async getMatchPercentage(userBasicId, otherUserBasicId) {
    let matchingFields = [];
    let differentFields = [];
    let userDetails = await this.getAllUserDetailsById(userBasicId);
    let userPreference = await this.getUserPreferenceByUserId(userBasicId);
    let otherUserPreference = await this.getUserPreferenceByUserId(
      otherUserBasicId,
    );

    console.log('userPreference', userPreference);
    console.log('otherUserPreference', otherUserPreference);
    console.log('userDetails', userDetails.userImages[0]);
    let excludedFields = [
      'createdAt',
      'updatedAt',
      'isActive',
      'createdBy',
      'updatedBy',
      'id',
    ];
    let requiredMatchDetails = [];

    Object.keys(userPreference)
      .filter((x) => excludedFields.indexOf(x) == -1)
      .forEach((filed) => {
        var matchField = {
          field: '',
          value: '',
          isMatching: false,
        };
        if (userPreference[filed]) {
          if (userPreference[filed] === otherUserPreference[filed]) {
            console.log('fdfdfddf', filed);
            if (filed === 'minAge' || filed === 'maxAge') {
              // matchField.field = 'age';
              // matchField.value = `${otherUserPreference[filed]}`;
              // matchField.isMatching = true;
              requiredMatchDetails.map((p) =>
                p.field === 'age'
                  ? {
                      ...p,
                      filed: 'age',
                      value: `${otherUserPreference[filed]}`,
                      isMatching: true,
                    }
                  : {
                      filed: 'age',
                      value: `${otherUserPreference[filed]}`,
                      isMatching: true,
                    },
              );
            } else {
              matchField.field = filed;
              matchField.value = otherUserPreference[filed];
              matchField.isMatching = true;
            }
            requiredMatchDetails.push(matchField);
            matchingFields.push({ filed, value: userPreference[filed] });
          } else {
            if (filed === 'minAge' || filed === 'maxAge') {
              // matchField.field = 'age';
              // matchField.value = `${otherUserPreference[filed]}`;
              // matchField.isMatching = false;
              requiredMatchDetails.map((p) => {
                return p.field === 'age'
                  ? {
                      ...p,
                      filed: 'age',
                      value: `${otherUserPreference[filed]}`,
                      isMatching: false,
                    }
                  : {
                      ...p,
                      filed: 'age',
                      value: `${otherUserPreference[filed]}`,
                      isMatching: false,
                    };
              });
            } else {
              matchField.field = filed;
              matchField.value = otherUserPreference[filed];
            }

            requiredMatchDetails.push(matchField);
            differentFields.push({ filed, value: userPreference[filed] });
          }
        }
      });
    let match_percentage = (
      (matchingFields.length /
        (matchingFields.length + differentFields.length)) *
      100
    ).toFixed(0);
    return {
      matchingFields: matchingFields,
      differentFields: differentFields,
      match_percentage: match_percentage,
      requiredMatchDetails: requiredMatchDetails,
      userImage: userDetails.userImages[0],
    };
  }
  async getRecentViews(userBasicId: string) {
    // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // return result;
    // const result = await this.userBasicRepo.find()
    const entityManager = getManager();
    // const rawQuery = `select pv.id as visitId,
    const rawQuery = `select pv.id as userBasicId,
    uva.*,
    pv.updatedAt as visitedAt
    from profile_visit pv
     join users_view_admin uva on
    pv.visitedToId = uva.id
    WHERE pv.isActive
    and pv.visitedById = '${userBasicId}'
    and pv.updatedAt > NOW() - INTERVAL (select value  from settings where name = 'RecentProfileVisitDuratinThreshholdInDays' ) DAY
    group by pv.visitedToId`;
    const userDet = await entityManager.query(rawQuery);
    return userDet;
  }
  async getProifleVisitedBy(userBasicId: string) {
    // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // return result;
    const entityManager = getManager();

    const rawQuery = `select pv.id as visitId,
    uva.*,
    pv.updatedAt as visitedAt
    from profile_visit pv
     join users_view_admin uva on
    pv.visitedById = uva.id
    and pv.visitedToId = '${userBasicId}'
    and pv.updatedAt > NOW() - INTERVAL (select value  from settings where name = 'RecentProfileVisitDuratinThreshholdInDays' ) DAY
    group by pv.visitedById;`;
    const userDet = await entityManager.query(rawQuery);
    return userDet;
  }

  async getOnlineMembers(userBasicId: string) {
    // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // return result;

    const entityManager = getManager();
    const rawQuery = `select distinct(pv.id) as userBasicId, pv.*,
    pv.createdAt as visitedAt
    from users_view pv
    join users_view uv
    WHERE uv.id = '${userBasicId}'
    and pv.isActive = 1
    and pv.id != '${userBasicId}'
    and pv.gender != uv.gender
    group by pv.id
`;
    // const userDet = await entityManager.query(rawQuery);
    // return userDet;
    const userDet = await entityManager.query(rawQuery);
    console.log('requiredConnectionData', userDet);
    const userReligionQuery = `select religion  from user_preferences where userBasicId='${userBasicId}'`;

    let requiredReligionData = await entityManager.query(userReligionQuery);
    console.log('requiredReligionData', requiredReligionData);
    let userReligions = [].concat(
      ...requiredReligionData
        .map((x) => JSON.parse(x.religion))
        .filter((y) => y != null),
    );
    console.log('userReligions', userReligions);
    let result = userDet.filter(
      (c) =>
        c.religion && userReligions.some((r) => c.religion.indexOf(r) > -1),
    );
    return result;
  }

  async getPremiumMembers(userBasicId: string) {
    const entityManager = getManager();
    const rawQuery = `select  distinct(ucl.userBasicId), s.name as state,c.name as city, ui.imageURL,ua.name,ua.dateOfBirth,up.religion  from user_connect_logs ucl 
    join user_preferences up   on ucl.userBasicId =  up.userBasicId
    join user_images ui on ui.userBasicId = ucl.userBasicId
    join user_abouts ua on ua.userBasicId = ucl.userBasicId
    join user_family_backgrounds ufb on ufb.userBasicId = ucl.userBasicId
    join states s on s.id=ufb.state
    join cities c on c.id = ufb.city
     WHERE  ucl.updatedBy < NOW() - INTERVAL (select value  from settings where name = 'PremiumMemberConnectrequestMonthDuration' ) MONTH
     AND currentConnectBalance > (select value  from settings where name = 'PremiumMemberConnectBuyCountThreshhold' )
     group by ucl.userBasicId 
     ;`;
    const requiredConnectionData = await entityManager.query(rawQuery);
    console.log('requiredConnectionData', requiredConnectionData);
    const userReligionQuery = `select religion  from user_preferences where userBasicId='${userBasicId}'`;

    let requiredReligionData = await entityManager.query(userReligionQuery);
    console.log('requiredReligionData', requiredReligionData);
    let userReligions = [].concat(
      ...requiredReligionData.map((x) => JSON.parse(x.religion)),
    );
    console.log('userReligions', userReligions);
    let result = requiredConnectionData.filter((c) =>
      userReligions.some((r) => c.religion.indexOf(r) > -1),
    );

    //.map(async c=>  await this.getProfilesByPreference(c.userBaicId))
    console.log('result', result);
    return result;
  }
  async blockProfile(ucl) {
    let ifBlocked = await this.userBlockRepo.findOne({
      where: {
        block_who: ucl.block_who,
        block_whom: ucl.block_whom,
      },
    });
    if (ifBlocked) {
      return { message: 'Already Blocked' };
    } else {
      return await this.userBlockRepo.save(ucl);
    }
  }
  async unBlockUser(id) {
    let ifBlocked = await this.userBlockRepo.findOne({
      where: {
        id: id,
      },
    });
    console.log(id);
    console.log(ifBlocked);
    if (ifBlocked) {
      return await this.userBlockRepo.delete(ifBlocked);
    } else {
      return 'No record found';
    }
  }
  async getBlockedUsers(id) {
    return await this.userBlockRepo.find({
      where: {
        block_who: id,
      },
    });
  }
  async getBlockedUsersForAll(id) {
    return await this.userBlockRepo.find({
      where: {
        block_who: id,
        block_whom: id,
      },
    });
  }
  async checkIfBlocked(myBasicId: string, userBasicId: string) {
    return await this.userBlockRepo.findOne({
      where: {
        block_who: myBasicId,
        block_whom: userBasicId,
      },
    });
  }
  async createNotification(data: any) {
    return await this.notificationRepo.save({ ...data });
  }
  async updateNotification(data: any) {
    return await this.notificationRepo.save({ ...data });
  }
}
