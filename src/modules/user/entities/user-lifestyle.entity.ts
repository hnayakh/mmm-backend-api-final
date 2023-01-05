import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  DrinkingHabit,
  EatingHabit,
  LifestyleOptions,
  MaritalStatus,
  SmokingHabit,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_lifestyle')
export class UserLifestyle extends AbstarctEntity {
  @Column()
  lifestyle: string;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userLifestyle)
  userBasic: UserBasic;

  static createUserLifestyle(
    lifestyle: string,
    userBasic: UserBasic,
  ) {
    const userLifestyle = new UserLifestyle();
    userLifestyle.lifestyle = lifestyle;
    userLifestyle.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userLifestyle.userBasic = userBasic;
    return userLifestyle;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
