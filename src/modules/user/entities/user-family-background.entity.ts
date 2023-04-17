import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import {
  FamilyAfluenceLevel,
  FamilyType,
  FamilyValues,
} from 'src/shared/enums/user-profile.enum';

@Entity('user_family_backgrounds')
export class UserFamilyBackground extends AbstarctEntity {
  @Column({ default: FamilyAfluenceLevel.MiddleClass })
  familyStatus: FamilyAfluenceLevel;

  @Column({ default: FamilyValues.Moderate })
  familyValues: FamilyValues;

  @Column()
  familyType: FamilyType;

  @Column()
  country: number;

  @Column()
  state: number;

  @Column()
  city: number;

  @Column()
  isResidingWithFamily: number;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne(
    (type) => UserBasic,
    (userBasic) => userBasic.userFamilyBackgrounds,
  )
  userBasic: UserBasic;

  static createUserFamilyBackground(
    familyStatus: FamilyAfluenceLevel,
    familyValues: FamilyValues,
    familyType: FamilyType,
    country: number,
    isResidingWithFamily: number,
    state: number,
    city: number,
    userBasic: UserBasic,
  ) {
    const ufb = new UserFamilyBackground();
    ufb.familyStatus = familyStatus;
    ufb.familyValues = familyValues;
    ufb.familyType = familyType;
    ufb.country = country;
    ufb.state = state;
    ufb.isResidingWithFamily = isResidingWithFamily;
    ufb.city = city;
    ufb.userBasic = userBasic;
    ufb.profileUpdationStatus = ProfileUpdationStatus.Pending;
    return ufb;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
