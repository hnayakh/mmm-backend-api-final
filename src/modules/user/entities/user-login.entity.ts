import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { AdminRoles } from 'src/shared/enums/miscellaneous.enum';
import { Gender } from 'src/shared/enums/user-profile.enum';
import { UserBasic } from './user-basic.entity';

@Entity('user_logins')
export class UserLogin extends AbstarctEntity {
  @Column()
  deviceType: string;

  @Column()
  deviceId: string;

  @Column()
  authToken: string;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userLogins)
  userBasic: UserBasic;

  static createUserLoginRecord(
    deviceType: string,
    deviceId: string,
    authToken: string,
    userBasic: UserBasic,
  ) {
    const userLogin = new UserLogin();
    userLogin.deviceType = 'Mobile';
    userLogin.deviceId = 'xioakieq8734jd';
    userLogin.authToken = authToken;
    userLogin.userBasic = userBasic;
    return userLogin;
  }

  deactivate() {
    this.isActive = false;
    return this;
  }
}
