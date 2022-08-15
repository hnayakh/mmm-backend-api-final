import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { Connect } from './entities/connect.entity';
import { Coupon } from './entities/coupon.entity';
import { Referral } from './entities/referral.entity';
import { MasterController } from './master.controller';
import { MasterFacade } from './master.facade';
import { MasterRepo } from './master.repo';
import { MasterService } from './master.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
    TypeOrmModule.forFeature([Connect, Referral, Coupon]),
  ],
  controllers: [MasterController],
  providers: [MasterFacade, MasterService, MasterRepo],
  exports: [MasterService],
})
export class MasterModule {}
