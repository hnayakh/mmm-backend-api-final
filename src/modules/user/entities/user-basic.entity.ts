import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { Gender, Relationship } from 'src/shared/enums/user-profile.enum';
import { UserBio } from './user-bio.entity';
import { UserAbout } from './user-about.entity';
import { UserHabit } from './user-habit.entity';
import { UserReligion } from './user-religion.entity';
import { UserCareer } from './user-career.entity';
import { UserFamilyBackground } from './user-family-background.entity';
import { UserFamilyDetail } from './user-family-detail.entity';
import { UserImage } from './user-image.entity';
import {
  ActivationStatus,
  LifecycleStatus,
  RegistrationSteps,
} from 'src/shared/enums/miscellaneous.enum';
import { UserLogin } from './user-login.entity';
import { UserPreference } from './user-preference.entity';
import * as shortid from 'shortid';
import { UserConnect } from 'src/modules/connect/entities/user-connect.entity';
import { RechargeHistory } from 'src/modules/connect/entities/recharge-history.entity';
import { UserConnectLog } from 'src/modules/connect/entities/user-connect-log.entity';
import { ProfileVisit } from './user.profile.visit';
import { ConnectTransactionEntity } from 'src/modules/connect/entities/connect-transaction-entity';
import { UserDocs } from './user-docs.entity';
import { nanoid } from 'nanoid';

@Entity('user_basics')
export class UserBasic extends AbstarctEntity {
  @Column({ default: Relationship.Self })
  relationship: Relationship;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: Gender;

  @Column()
  countryCode: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  displayId: string;

  @Column()
  activationStatus: ActivationStatus;

  @Column()
  lifecycleStatus: LifecycleStatus;

  @Column({ default: RegistrationSteps.Basic })
  registrationStep: RegistrationSteps;

  @OneToMany((type) => UserBio, (userBios) => userBios.userBasic)
  userBios: UserBio[];

  @OneToMany((type) => UserAbout, (userAbouts) => userAbouts.userBasic)
  userAbouts: UserAbout[];

  @OneToMany((type) => UserHabit, (userHabits) => userHabits.userBasic)
  userHabits: UserHabit[];

  @OneToMany((type) => UserReligion, (userReligions) => userReligions.userBasic)
  userReligions: UserReligion[];

  @OneToMany((type) => ProfileVisit, (visit) => visit.visitedBy)
  visitedBy: ProfileVisit[];

  @OneToMany((type) => ProfileVisit, (visit) => visit.visitedTo)
  visitedTo: ProfileVisit[];

  @OneToMany((type) => UserCareer, (userCareers) => userCareers.userBasic)
  userCareers: UserCareer[];

  @OneToMany(
    (type) => UserFamilyBackground,
    (userFamilyBackgrounds) => userFamilyBackgrounds.userBasic,
  )
  userFamilyBackgrounds: UserFamilyBackground[];

  @OneToMany(
    (type) => UserFamilyDetail,
    (userFamilyDetails) => userFamilyDetails.userBasic,
  )
  userFamilyDetails: UserFamilyDetail[];

  @OneToMany((type) => UserImage, (userImages) => userImages.userBasic)
  userImages: UserImage[];
  
  @OneToMany((type) => UserDocs, (UserDocs) => UserDocs.userBasic)
  userDocs: UserDocs[];

  @OneToMany((type) => UserConnect, (userConnects) => userConnects.userBasic)
  userConnects: UserConnect[];

  @OneToMany(
    (type) => ConnectTransactionEntity,
    (connectTransaction) => connectTransaction.userBasic,
  )
  connectTransaction: ConnectTransactionEntity[];

  @OneToMany(
    (type) => RechargeHistory,
    (rechargeHistory) => rechargeHistory.userBasic,
  )
  rechargeHistory: RechargeHistory[];

  @OneToMany(
    (type) => UserConnectLog,
    (userConnectLogs) => userConnectLogs.userBasic,
  )
  userConnectLogs: RechargeHistory[];

  @OneToMany((type) => UserPreference, (userImages) => userImages.userBasic)
  userPreferences: UserPreference[];

  @OneToMany((type) => UserLogin, (userLogins) => userLogins.userBasic)
  userLogins: UserLogin[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password == null ? 'User@123' : this.password,
      8,
    );
  }

  static createUserBasic(
    email: string,
    gender: Gender,
    countryCode: string,
    phoneNumber: string,
    password: string,
    relationship: Relationship,
  ) {
    const userBasic = new UserBasic();
    userBasic.email = email;
    userBasic.gender = gender;
    userBasic.countryCode = countryCode;
    userBasic.phoneNumber = phoneNumber;
    userBasic.password = password;
    userBasic.activationStatus = ActivationStatus.Pending;
    userBasic.lifecycleStatus = LifecycleStatus.Active;
    userBasic.registrationStep = RegistrationSteps.About;
    userBasic.relationship = relationship;
   // userBasic.displayId = 'MM' + shortid.generate();
    userBasic.displayId = 'MM' + nanoid(6);

    console.log("NANOID",userBasic.displayId );
    return userBasic;
  }

  updateRegistrationStep(registrationStep: RegistrationSteps) {
    this.registrationStep = registrationStep;
    return this;
  }

  updateStatus(
    activationStatus: ActivationStatus,
    registrationSteps: RegistrationSteps,
  ) {
    this.activationStatus = activationStatus;
    this.registrationStep = registrationSteps;
    return this;
  }
}
