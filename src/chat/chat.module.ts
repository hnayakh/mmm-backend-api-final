import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ChatRepo } from './chat.repo';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';

@Module({
  imports: [forwardRef(() => SharedModule), TypeOrmModule.forFeature([Chat])],
  controllers: [],
  providers: [ChatService, ChatRepo],
  exports: [ChatService],
})
export class ChatModule {}
