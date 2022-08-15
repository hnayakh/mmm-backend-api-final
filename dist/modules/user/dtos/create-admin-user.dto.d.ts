import { AdminRoles } from 'src/shared/enums/miscellaneous.enum';
import { Gender } from 'src/shared/enums/user-profile.enum';
export declare class CreateAdminUserDto {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    phoneNumber: string;
    password: string;
    role: AdminRoles;
}
