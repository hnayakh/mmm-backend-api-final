import { DrinkingHabit, EatingHabit, SmokingHabit } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserHabitDto {
    userBasicId: string;
    eatingHabit: EatingHabit;
    smokingHabit: SmokingHabit;
    drinkingHabit: DrinkingHabit;
}
