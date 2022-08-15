import { AnualIncome } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserCareerDto {
    userBasicId: string;
    employedIn: string;
    occupation: string;
    annualIncome: AnualIncome;
    highestEducation: string;
    country: number;
    state: number;
    city: number;
}
