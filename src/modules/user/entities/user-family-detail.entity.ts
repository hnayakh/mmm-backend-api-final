import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  FatherOccupation,
  MotherOccupation,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_family_details')
export class UserFamilyDetail extends AbstarctEntity {
  @Column({ default: FatherOccupation.Business })
  fatherOccupation: FatherOccupation;

  @Column({ default: MotherOccupation.HomeMaker })
  motherOccupation: MotherOccupation;

  @Column()
  numberOfBrothers: number;

  @Column()
  marriedNumberOfBrothers: number;

  @Column()
  numberOfSisters: number;

  @Column()
  marriedNumberOfSisters: number;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userFamilyDetails)
  userBasic: UserBasic;

  static createUserFamilyDetail(
    fatherOccupation: FatherOccupation,
    motherOccupation: MotherOccupation,
    numberOfBrothers: number,
    marriedNumberOfBrothers: number,
    numberOfSisters: number,
    marriedNumberOfSisters: number,
    userBasic: UserBasic,
  ) {
    const ufd = new UserFamilyDetail();
    ufd.fatherOccupation = fatherOccupation;
    ufd.motherOccupation = motherOccupation;
    ufd.numberOfBrothers = numberOfBrothers;
    ufd.marriedNumberOfBrothers = marriedNumberOfBrothers;
    ufd.numberOfSisters = numberOfSisters;
    ufd.profileUpdationStatus = ProfileUpdationStatus.Pending;
    ufd.userBasic = userBasic;
    ufd.marriedNumberOfSisters = marriedNumberOfSisters;
    return ufd;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
