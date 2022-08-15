import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
import { tr } from 'date-fns/locale';

@Entity('referrals')
export class Referral extends AbstarctEntity {
  static createReferral() {
    const refObj = new Referral();
    refObj.isActive = true;
    return refObj;
  }

  updateReferral(isActive: boolean) {
    this.isActive = isActive.toString() == 'true' ? true : false;
    return this;
  }
}
