import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { DrinkingHabit, EatingHabit, SmokingHabit } from 'src/shared/enums/user-profile.enum';
export declare class UserHabit extends AbstarctEntity {
    eatingHabit: EatingHabit;
    smokingHabit: SmokingHabit;
    drinkingHabit: DrinkingHabit;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserHabit(eatingHabit: EatingHabit, smokingHabit: SmokingHabit, drinkingHabit: DrinkingHabit, userBasic: UserBasic): UserHabit;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
