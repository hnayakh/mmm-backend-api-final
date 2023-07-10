import { AccountType, Gender, Relationship } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserBasicDto {
    relationship: Relationship;
    email: string;
    gender: Gender;
    countryCode: string;
    fireBaseToken: string;
    phoneNumber: string;
    password: string | null | undefined;
    socialProvider: AccountType | null | undefined;
    providerId: string | null | undefined;
}
