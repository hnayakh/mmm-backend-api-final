import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  DrinkingHabit,
  EatingHabit,
  MaritalStatus,
  SmokingHabit,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_habits')
export class UserHabit extends AbstarctEntity {
  @Column()
  eatingHabit: EatingHabit;

  @Column()
  smokingHabit: SmokingHabit;

  @Column()
  drinkingHabit: DrinkingHabit;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userHabits)
  userBasic: UserBasic;

  static createUserHabit(
    eatingHabit: EatingHabit,
    smokingHabit: SmokingHabit,
    drinkingHabit: DrinkingHabit,
    userBasic: UserBasic,
  ) {
    const userHabit = new UserHabit();
    userHabit.eatingHabit = eatingHabit;
    userHabit.smokingHabit = smokingHabit;
    userHabit.drinkingHabit = drinkingHabit;
    userHabit.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userHabit.userBasic = userBasic;
    return userHabit;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
