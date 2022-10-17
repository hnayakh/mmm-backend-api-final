import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserModule } from '../user/user.module';
import { CmsController } from './cms.controller';
import { CmsFacade } from './cms.facade';
import { CmsRepo } from './cms.repo';
import { CmsService } from './cms.service';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';

@Module({
  imports: [
    forwardRef(() => SharedModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([faq, success_stories, content_creation]),
  ],
  controllers: [CmsController],
  providers: [CmsService, CmsRepo, CmsFacade],
  exports: [CmsService],
})
export class CmsModule {}
