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

@Entity('user_hobbies')
export class UserHobbies extends AbstarctEntity {
  @Column({ type: 'longtext' })
  hobbies: string;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userHobbies)
  userBasic: UserBasic;

  static createUserLifestyle(hobbies: string, userBasic: UserBasic) {
    const userHobbies = new UserHobbies();
    userHobbies.hobbies = hobbies;
    userHobbies.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userHobbies.userBasic = userBasic;
    return userHobbies;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
