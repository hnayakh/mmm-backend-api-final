import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('connects')
export class Connect extends AbstarctEntity {
  @Column()
  connectPrice: number;

  @Column()
  discountType: DiscountType;

  @Column()
  discount: number;

  @Column()
  discountedPrice: number;

  @Column()
  firstTimeBenifitMins: number;

  @Column()
  secondTimeBenifitMins: number;

  static createConnect(
    connectPrice: number,
    discountType: DiscountType,
    discount: number,
    discountedPrice: number,
    firstTimeBenifitMins: number,
    secondTimeBenifitMins: number,
  ) {
    const connectObj = new Connect();
    connectObj.connectPrice = connectPrice;
    connectObj.discountType = discountType;
    connectObj.discount = discount;
    connectObj.discountedPrice = discountedPrice;
    connectObj.firstTimeBenifitMins = firstTimeBenifitMins;
    connectObj.secondTimeBenifitMins = secondTimeBenifitMins;
    return connectObj;
  }

  updateConnect(
    connectPrice: number,
    discountType: DiscountType,
    discount: number,
    discountedPrice: number,
    firstTimeBenifitMins: number,
    secondTimeBenifitMins: number,
  ) {
    this.connectPrice = connectPrice;
    this.discountType = discountType;
    this.discount = discount;
    this.discountedPrice = discountedPrice;
    this.firstTimeBenifitMins = firstTimeBenifitMins;
    this.secondTimeBenifitMins = secondTimeBenifitMins;
    return this;
  }
}
