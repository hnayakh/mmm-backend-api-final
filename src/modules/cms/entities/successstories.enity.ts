import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('success_stories')

export class success_stories extends AbstarctEntity {
  @Column()
  heading: string;
  @Column()
  story: string;
  @Column()
  photo: string;
  @Column()
  position: number;
  static createSuccess(
    heading: string,
    story: string,
    photo: string,
    position: number,
  ) {
    const Obj = new success_stories();
    Obj.heading = heading;
    Obj.story = story;
    Obj.photo = photo;
    Obj.position = position;
    return Obj;
  }

  updateSuccess(heading: string, story: string, photo: string, position: number) {
    this.heading = heading;
    this.story = story;
    this.photo = photo;
    this.position = position;
    return this;
  }
}
