import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AnualIncome } from 'src/shared/enums/user-profile.enum';

@Entity('user_careers')
export class UserCareer extends AbstarctEntity {
  @Column()
  employedIn: string;

  @Column()
  occupation: string;

  @Column()
  annualIncome: AnualIncome;

  @Column()
  highestEducation: string;

  @Column()
  country: number;

  @Column()
  state: number;

  @Column()
  city: number;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userCareers)
  userBasic: UserBasic;

  static createUserCareer(
    employedIn: string,
    occupation: string,
    annualIncome: AnualIncome,
    highestEducation: string,
    country: number,
    state: number,
    city: number,
    userBasic: UserBasic,
  ) {
    const userCareer = new UserCareer();
    userCareer.employedIn = employedIn;
    userCareer.occupation = occupation;
    userCareer.annualIncome = annualIncome;
    userCareer.highestEducation = highestEducation;
    userCareer.country = country;
    userCareer.state = state;
    userCareer.city = city;
    userCareer.userBasic = userBasic;
    userCareer.profileUpdationStatus = ProfileUpdationStatus.Pending;
    return userCareer;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
