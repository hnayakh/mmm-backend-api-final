import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
export declare class Connect extends AbstarctEntity {
    connectPrice: number;
    discountType: DiscountType;
    discount: number;
    discountedPrice: number;
    firstTimeBenifitMins: number;
    secondTimeBenifitMins: number;
    static createConnect(connectPrice: number, discountType: DiscountType, discount: number, discountedPrice: number, firstTimeBenifitMins: number, secondTimeBenifitMins: number): Connect;
    updateConnect(connectPrice: number, discountType: DiscountType, discount: number, discountedPrice: number, firstTimeBenifitMins: number, secondTimeBenifitMins: number): this;
}
