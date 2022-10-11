import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('faq')
export class faq extends AbstarctEntity {
  @Column()
  question: string;
  @Column()
  answer: string;
  @Column()
  position: number;
  static createFaq(question: string, answer: string, position: number) {
    const faqObj = new faq();
    faqObj.question = question;
    faqObj.answer = answer;
    faqObj.position = position;
    return faqObj;
  }

  updateFaq(question: string, answer: string, position: number) {
    this.question = question;
    this.answer = answer;
    this.position = position;
    return this;
  }
}
