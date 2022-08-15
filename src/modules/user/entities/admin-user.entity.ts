import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { AdminRoles } from 'src/shared/enums/miscellaneous.enum';
import { Gender } from 'src/shared/enums/user-profile.enum';
import * as bcrypt from 'bcrypt';

@Entity('admin_users')
export class AdminUser extends AbstarctEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: Gender;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  role: AdminRoles;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password == null ? 'User@123' : this.password,
      8,
    );
  }

  static createAdminUser(
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    phoneNumber: string,
    password: string,
    role: AdminRoles,
  ) {
    const adminUser = new AdminUser();
    adminUser.firstName = firstName;
    adminUser.lastName = lastName;
    adminUser.email = email;
    adminUser.gender = gender;
    adminUser.phoneNumber = phoneNumber;
    adminUser.password = password;
    adminUser.role = role;
    return adminUser;
  }
}
