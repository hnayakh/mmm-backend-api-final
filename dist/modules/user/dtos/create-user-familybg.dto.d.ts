import { FamilyAfluenceLevel, FamilyType, FamilyValues } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserFamilyBgDto {
    userBasicId: string;
    familyStatus: FamilyAfluenceLevel;
    familyValues: FamilyValues;
    familyType: FamilyType;
    country: number;
    isResidingWithFamily: number;
    state: number;
    city: number;
}
