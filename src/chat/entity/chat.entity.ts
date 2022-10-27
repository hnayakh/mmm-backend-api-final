import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('chat')
export class Chat extends AbstarctEntity {
  @Column()
  userbasicId: string;
  @Column()
  recieverBasicId: String;
  @Column()
  text: string;

  static createFaq(userbasicId: string, text: string, position: number) {
    const faqObj = new Chat();
    faqObj.userbasicId = userbasicId;
    faqObj.text = text;
    return faqObj;
  }

  updateFaq(userbasicId: string, text: string, position: number) {
    this.userbasicId = userbasicId;
    this.text = text;
    return this;
  }
}
