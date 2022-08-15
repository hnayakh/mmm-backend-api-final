import { FatherOccupation, MotherOccupation } from 'src/shared/enums/user-profile.enum';
export declare class CreateUserFamilyDDto {
    userBasicId: string;
    fatherOccupation: FatherOccupation;
    motherOccupation: MotherOccupation;
    numberOfBrothers: number;
    marriedNumberOfBrothers: number;
    numberOfSisters: number;
    marriedNumberOfSisters: number;
}
