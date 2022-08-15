import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class Referral extends AbstarctEntity {
    static createReferral(): Referral;
    updateReferral(isActive: boolean): this;
}
