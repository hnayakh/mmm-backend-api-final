import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ta } from 'date-fns/locale';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
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
    @InjectRepository(ProfileVisit)
    private readonly userProfileVisitRepo: Repository<ProfileVisit>,
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

  async getUserBasicById(userBasicId: string) {
    return await this.userBasicRepo.findOne(userBasicId);
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
    let existingAboutRecord= await this.userAboutRepo.findOne({
      where: {
        userBasic: userAbout.userBasic,
      },
    })
    console.log("existingAboutRecord", existingAboutRecord)
    return existingAboutRecord !=null ? await this.updateUserAbout(userAbout) : await this.userAboutRepo.save(userAbout);
  }



  async updateUserAbout(userAbout: UserAbout) {
    // let userAboutData= this.userAboutRepo.findOne({
    //   where: { userBasic: userAbout.userBasic},
    // });
    console.log("updating...............")
      await this.userAboutRepo.update({ userBasic: userAbout.userBasic},{ ...userAbout });
      return userAbout;
  }

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
    return await this.userHabitRepo.save(userHabit);
  }

  async updateUserHabit(userHabit: UserHabit) {
    return await this.userHabitRepo.save({ ...userHabit });
  }

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

    let existingFamilyDetailRecord= await this.userFamilyDetailRepo.findOne({
      where: {
        userBasic: ufd.userBasic,
      },
    })
    console.log("existingAboutRecord", existingFamilyDetailRecord)
    return  existingFamilyDetailRecord != null ? this.updateUserFamilyDetail(ufd) : await this.userFamilyDetailRepo.save(ufd);
  }

  async updateUserFamilyDetail(ufd: UserFamilyDetail) {
    // return await this.userFamilyDetailRepo.save({ ...ufd });
    console.log("updating Family Details..................")
    await this.userFamilyDetailRepo.update({ userBasic: ufd.userBasic},{ ...ufd });
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

    let existingFamilyBackgroundRecord= await this.userFamilyBackgroundRepo.findOne({
      where: {
        userBasic: ufbg.userBasic,
      },
    })
    console.log("existingAboutRecord", existingFamilyBackgroundRecord)
    return  existingFamilyBackgroundRecord != null ? this.updateUserFamilyBackground(ufbg) : await this.userFamilyBackgroundRepo.save(ufbg);
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
    console.log("updating Backgrround Details..................")
    await this.userFamilyBackgroundRepo.update({ userBasic: ufbg.userBasic},{ ...ufbg });
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
    return await this.userCareerRepo.save(userCareer);
  }

  async updateUserCareer(userCareer: UserCareer) {
    return await this.userCareerRepo.save({ ...userCareer });
  }

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
    return await this.userReligionRepo.save(userReligion);
  }

  async updateUserReligion(userReligion: UserReligion) {
    return await this.userReligionRepo.save({ ...userReligion });
  }

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
    return await this.userBioRepo.save(userBio);
  }

  async updateUserBio(userBio: UserBio) {
    return await this.userBioRepo.save({ ...userBio });
  }

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
    s.name as state,ums.name as maritalStatus ,c.name as country,
    up.state,up.city, up.religion, up.caste, up.motherTongue, up.highestEducation, up.
    occupation, up.dietaryHabits, up.drinkingHabits, up.smokingHabits, up.challenged, up.maxIncome, up.minIncome  
    FROM user_preferences up
    inner join states s ON REGEXP_LIKE(up.state, s.id)
    inner join user_marital_status ums on REGEXP_LIKE(up.maritalStatus, ums.id)
    inner join  countries c ON REGEXP_LIKE(up.country, c.id)
    where up.userBasicId= '${userBasicId}'`;

    const userDet = await entityManager.query(rawQuery);

    console.log('userDet', userDet);
    let userPreferenc: UserPreference = new UserPreference();
    userDet.forEach((record) => {
      console.log('record', Object.keys(record));
      Object.keys(record).forEach((key) => {
        console.log('key', key);
        let recordValue =
          record[key].toString().indexOf('[') == 0
            ? String(JSON.parse(record[key]))
            : record[key];
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
    });
    console.log('userDet', userDet);
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
    console.log('userDetails', userDetails.userImages[0]);
    let excludedFields = [
      'createdAt',
      'updatedAt',
      'isActive',
      'createdBy',
      'updatedBy',
      'id',
    ];
    Object.keys(userPreference)
      .filter((x) => excludedFields.indexOf(x) == -1)
      .forEach((filed) => {
        if (userPreference[filed]) {
          if (userPreference[filed] === otherUserPreference[filed]) {
            console.log('fdfdfddf', userPreference);
            matchingFields.push({ filed, value: userPreference[filed] });
          } else {
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
      userImage: userDetails.userImages[0],
    };
  }
  async getRecentViews(userBasicId: string) {
    // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // return result;
    // const result = await this.userBasicRepo.find()
    const entityManager = getManager();
    const rawQuery = `select pv.id as userBasicId,
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
  async getProifleVisitedBy(userBasicId: string) {
    // const result = await this.userProfileVisitRepo.find({ where: { visitedBy: { id: userBasicId }, }, });
    // return result;
    const entityManager = getManager();
    const rawQuery = `select pv.id as visitId,
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
}
