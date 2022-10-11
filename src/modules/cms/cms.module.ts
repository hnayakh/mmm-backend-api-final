import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { MasterModule } from '../master/master.module';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserModule } from '../user/user.module';
import { CmsController } from './cms.controller';
import { faqFacade } from './cms.facade';
import { CmsRepo } from './cms.repo';
import { FaqService } from './cms.service';
import { faq } from './entities/faq.entity';

@Module({
  imports: [
    forwardRef(() => MasterModule),
    forwardRef(() => SharedModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UserBasic,faq]),
  ],
  controllers: [CmsController],
  providers: [FaqService, FaqService, CmsRepo,faqFacade],
  exports: [FaqService, CmsRepo],
})
export class CmsModule {}
