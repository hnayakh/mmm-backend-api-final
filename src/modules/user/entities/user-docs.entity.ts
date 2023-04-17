import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('user_docs')
export class UserDocs extends AbstarctEntity {
  @Column()
  imageURL: string;

  @Column()
  idProof: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userDocs)
  userBasic: UserBasic;

  static createUserDocs(
    imageURL: string,
   idProof:string,
   isDefault: boolean,
    userBasic: UserBasic,
  ) {
    const userImage = new UserDocs();
    userImage.imageURL = imageURL;
    userImage.userBasic = userBasic;
    userImage.idProof=idProof;
    userImage.isDefault=isDefault;
    userImage.profileUpdationStatus = ProfileUpdationStatus.Pending;
    return userImage;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
