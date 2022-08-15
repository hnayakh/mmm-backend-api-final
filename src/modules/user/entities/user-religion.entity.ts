import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  AbilityStatus,
  ChildrenStatus,
  Manglik,
  MaritalStatus,
  Relationship,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_religions')
export class UserReligion extends AbstarctEntity {
  @Column()
  religion: string;

  @Column({ nullable: true })
  cast: string;

  @Column({ nullable: true })
  gothra: string;

  @Column()
  motherTongue: string;

  @Column({ default: Manglik.No })
  isManglik: Manglik;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userReligions)
  userBasic: UserBasic;

  static createUserReligion(
    religion: string,
    cast: string,
    gothra: string,
    motherTongue: string,
    isManglik: Manglik,
    userBasic: UserBasic,
  ) {
    const userReligion = new UserReligion();
    userReligion.religion = religion;
    userReligion.cast = cast;
    userReligion.gothra = gothra;
    userReligion.motherTongue = motherTongue;
    userReligion.isManglik = isManglik;
    userReligion.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userReligion.userBasic = userBasic;
    return userReligion;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
