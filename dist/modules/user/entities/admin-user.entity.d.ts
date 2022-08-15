import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { AdminRoles } from 'src/shared/enums/miscellaneous.enum';
import { Gender } from 'src/shared/enums/user-profile.enum';
export declare class AdminUser extends AbstarctEntity {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    phoneNumber: string;
    password: string;
    role: AdminRoles;
    hashPassword(): Promise<void>;
    static createAdminUser(firstName: string, lastName: string, email: string, gender: Gender, phoneNumber: string, password: string, role: AdminRoles): AdminUser;
}
