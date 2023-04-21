import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('user_settings')
export class Settings extends AbstarctEntity {
  @Column()
  status: UserMeetStatus;

  @Column()
  showPhone: boolean;

  @Column()
  showEmail: boolean;

  @Column()
  isHidden: boolean;

  @Column()
  isNotification: boolean;

  @Column()
  userBasicId: string;

  static createMeet(
    status: UserMeetStatus,
    showPhone: boolean,
    showEmail: boolean,
    isHidden: boolean,
    isNotification: boolean,
    userBasicId: string,
  ) {
    const settingObj = new Settings();
    settingObj.status = status;
    settingObj.showPhone = showPhone;
    settingObj.showEmail = showEmail;
    settingObj.isHidden = isHidden;
    settingObj.isNotification = isNotification;
    settingObj.userBasicId = userBasicId;

    return settingObj;
  }

  updateMeet(
    status: UserMeetStatus,
    showPhone: boolean,
    showEmail: boolean,
    isHidden: boolean,
    isNotification: boolean,
    userBasicId: string,
  ) {
    this.status = status;
    this.showPhone = showPhone;
    this.showEmail = showEmail;
    this.isHidden = isHidden;
    this.isNotification = isNotification;
    this.userBasicId = userBasicId;
    return this;
  }
}
