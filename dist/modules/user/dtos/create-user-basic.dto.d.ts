import { Gender, Relationship } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserBasicDto {
    relationship: Relationship;
    email: string;
    gender: Gender;
    countryCode: string;
    phoneNumber: string;
    password: string;
}
