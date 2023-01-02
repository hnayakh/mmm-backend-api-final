import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  AbilityStatus,
  ChildrenStatus,
  MaritalStatus,
  NumberOfChildren,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_abouts')
export class UserAbout extends AbstarctEntity {
  @Column()
  name: string;

  @Column()
  dateOfBirth: string;
  
  @Column()
  fireBaseToken: string;

  @Column()
  maritalStatus: MaritalStatus;

  @Column()
  childrenStatus: ChildrenStatus;

  @Column({ nullable: true })
  numberOfChildren: NumberOfChildren;

  @Column()
  abilityStatus: AbilityStatus;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @Column('decimal')
  height: number;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userAbouts)
  userBasic: UserBasic;

  static createUserAbout(
    name: string,
    dateOfBirth: string,
    maritalStatus: MaritalStatus,
    childrenStatus: ChildrenStatus,
    abilityStatus: AbilityStatus,
    height: number,
    userBasic: UserBasic,
    numberOfChildren: NumberOfChildren,
  ) {
    const userAbout = new UserAbout();
    userAbout.name = name;
    userAbout.dateOfBirth = dateOfBirth;
    userAbout.maritalStatus = maritalStatus;
    userAbout.childrenStatus = childrenStatus;
    userAbout.abilityStatus = abilityStatus;
    userAbout.height = height;
    userAbout.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userAbout.userBasic = userBasic;
    userAbout.numberOfChildren = numberOfChildren;
    return userAbout;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
