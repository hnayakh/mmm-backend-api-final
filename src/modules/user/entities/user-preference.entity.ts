import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';

@Entity('user_preferences')
export class UserPreference extends AbstarctEntity {
  @Column({ nullable: true })
  minAge: number;

  @Column({ nullable: true })
  maxAge: number;

  @Column({ nullable: true })
  minHeight: number;

  @Column({ nullable: true })
  maxHeight: number;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  caste: string;

  @Column({ nullable: true })
  motherTongue: string;

  @Column({ nullable: true })
  highestEducation: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  maxIncome: string;

  @Column({ nullable: true })
  minIncome: string;

  @Column({ nullable: true })
  dietaryHabits: string;

  @Column()
  drinkingHabits: string;

  @Column({ nullable: true })
  smokingHabits: string;

  @Column({ nullable: true })
  challenged: string;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userPreferences)
  userBasic: UserBasic;

  static createPreference(
    minAge: number,
    maxAge: number,
    minHeight: number,
    maxHeight: number,
    maritalStatus: string,
    country: string,
    state: string,
    city: string,
    religion: string,
    caste: string,
    motherTongue: string,
    highestEducation: string,
    occupation: string,
    maxIncome: string,
    minIncome: string,
    dietaryHabits: string,
    drinkingHabits: string,
    smokingHabits: string,
    challenged: string,
    userBasic: UserBasic,
  ) {
    const up = new UserPreference();
    up.minAge = minAge;
    up.maxAge = maxAge;
    up.minHeight = minHeight;
    up.maxHeight = maxHeight;
    up.maritalStatus = maritalStatus;
    up.country = country;
    up.state = state;
    up.city = city;
    up.religion = religion;
    up.caste = caste;
    up.motherTongue = motherTongue;
    up.highestEducation = highestEducation;
    up.occupation = occupation;
    up.maxIncome = maxIncome;
    up.minIncome = minIncome;
    up.dietaryHabits = dietaryHabits;
    up.drinkingHabits = drinkingHabits;
    up.smokingHabits = smokingHabits;
    up.challenged = challenged;
    up.userBasic = userBasic;
    return up;
  }
}
