import { Module,forwardRef } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { Meet } from './entities/meet.entity';
import { MeetFacade } from './meet.facade';
import { MeetRepo } from './meet.repo';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
    TypeOrmModule.forFeature([Meet]),
  ],
  controllers: [MeetController],
  providers: [MeetFacade, MeetService,MeetRepo],
  exports: [MeetService],
})
export class MeetModule {}
