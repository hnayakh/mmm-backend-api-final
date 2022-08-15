import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
export declare class ConnectDto {
    connectId: string;
    connectPrice: number;
    discountType: DiscountType;
    discount: number;
    discountedPrice: number;
    firstTimeBenifitMins: number;
    secondTimeBenifitMins: number;
    type: number;
}
