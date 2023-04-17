import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('user_bios')
export class UserBio extends AbstarctEntity {
  @Column()
  aboutMe: string;
  @Column()
  idProof: string;
  // imageUrl: string;
  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userBios)
  userBasic: UserBasic;

  static createUserBio(aboutMe: string, userBasic: UserBasic) {
    const userBio = new UserBio();
    userBio.aboutMe = aboutMe;
    userBio.profileUpdationStatus = ProfileUpdationStatus.Pending;
    userBio.userBasic = userBasic;
    return userBio;
  }
  static createUserDocBio(idProof: string) {
    const userBio = new UserBio();
    userBio.idProof = idProof;
    //userBio.profileUpdationStatus = ProfileUpdationStatus.Pending;
   // userBio.userBasic = userBasic;
    return userBio;
  }
  // static createUserDoc(imageUrl: string,idProof:string, userBasic: UserBasic) {
  //   const userBio = new UserBio();
  //   userBio.idProof = idProof;
  //   userBio.userBasic = userBasic;
  //   userBio.imageUrl = imageUrl
  //   return userBio;
  // }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
