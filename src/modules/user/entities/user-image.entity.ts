import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from './user-basic.entity';
import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('user_images')
export class UserImage extends AbstarctEntity {
  @Column()
  imageURL: string;

  @Column({ nullable: true })
  thumbnailURL: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column()
  profileUpdationStatus: ProfileUpdationStatus;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.userImages)
  userBasic: UserBasic;

  static createUserImage(
    imageURL: string,
    isDefault: boolean,
    userBasic: UserBasic,
  ) {
    // Random code
    // let rand = Math.floor(Math.random() * 13);
    // let images = ['https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.55+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.56+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.56+PM+(2).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.56+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.57+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.57+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.58+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.58+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.59+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.21.59+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.22.00+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.22.00+PM.jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.22.01+PM+(1).jpeg',
    //   'https://mmm-user-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-27+at+4.22.01+PM.jpeg'
    // ]
    const userImage = new UserImage();
    userImage.imageURL = imageURL;
    userImage.thumbnailURL = imageURL;
    userImage.isDefault = isDefault;
    userImage.userBasic = userBasic;
    userImage.profileUpdationStatus = ProfileUpdationStatus.Pending;
    return userImage;
  }

  updateProfileUpdationStatus(profileUpdationStatus: ProfileUpdationStatus) {
    this.profileUpdationStatus = profileUpdationStatus;
    return this;
  }
}
