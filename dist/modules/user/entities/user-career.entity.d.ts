import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AnualIncome } from 'src/shared/enums/user-profile.enum';
export declare class UserCareer extends AbstarctEntity {
    employedIn: string;
    occupation: string;
    annualIncome: AnualIncome;
    highestEducation: string;
    country: number;
    state: number;
    city: number;
    profileUpdationStatus: ProfileUpdationStatus;
    userBasic: UserBasic;
    static createUserCareer(employedIn: string, occupation: string, annualIncome: AnualIncome, highestEducation: string, country: number, state: number, city: number, userBasic: UserBasic): UserCareer;
    updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus): this;
}
