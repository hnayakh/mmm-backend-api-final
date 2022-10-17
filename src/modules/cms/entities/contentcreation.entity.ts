import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('content_creation')
export class content_creation extends AbstarctEntity {
  @Column()
  channel: string;
  @Column()
  template_name: string;
  @Column()
  content_heading: string;
  @Column()
  content: string;
  @Column()
  photo: string;
  @Column()
  position: number;
  static createSuccess(
    channel: string,
    template_name: string,
    content_heading: string,
    content: string,
    photo: string,
    position: number,
  ) {
    const Obj = new content_creation();
    Obj.channel = channel;
    Obj.template_name = template_name;
    Obj.content_heading = content_heading;
    Obj.content = content;
    Obj.photo = photo;
    Obj.position = position;
    return Obj;
  }

  updateSuccess(
    channel: string,
    template_name: string,
    content_heading: string,
    content: string,
    photo: string,
    position: number,
  ) {
    this.channel = channel;
    this.template_name = template_name;
    this.content_heading = content_heading;
    this.content = content;
    this.photo = photo;
    this.position = position;
    return this;
  }
}
