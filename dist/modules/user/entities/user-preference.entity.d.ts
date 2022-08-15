import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
export declare class UserPreference extends AbstarctEntity {
    minAge: number;
    maxAge: number;
    minHeight: number;
    maxHeight: number;
    maritalStatus: string;
    country: string;
    state: string;
    city: string;
    religion: string;
    caste: string;
    motherTongue: string;
    highestEducation: string;
    occupation: string;
    maxIncome: string;
    minIncome: string;
    dietaryHabits: string;
    drinkingHabits: string;
    smokingHabits: string;
    challenged: string;
    userBasic: UserBasic;
    static createPreference(minAge: number, maxAge: number, minHeight: number, maxHeight: number, maritalStatus: string, country: string, state: string, city: string, religion: string, caste: string, motherTongue: string, highestEducation: string, occupation: string, maxIncome: string, minIncome: string, dietaryHabits: string, drinkingHabits: string, smokingHabits: string, challenged: string, userBasic: UserBasic): UserPreference;
}
