import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';
import { getManager, Repository } from 'typeorm';
import { MessageDto } from './dtos/message.dto';
import { Chat } from './entity/chat.entity';

@Injectable()
export class ChatRepo {
  constructor(
    @InjectRepository(Chat)
    protected readonly chatEntity: Repository<Chat>,
  ) {}
  async allMessages() {
    return {
      userbasicId: 'etyuwteqtyqw',
      rhewuiryuewr: 'ewrhewgjhrewr',
    };
  }

  async sendMessage(MessageDto: MessageDto) {
    this.chatEntity.save(MessageDto);
  }
  async MyMessage(payload) {
    const entityManager = getManager();
    let query = `select * From chat 
    WHERE (userbasicId = '${payload.userbasicId}' AND recieverBasicId='${payload.recieverBasicId}') OR
         (userbasicId = '${payload.recieverBasicId}' AND recieverBasicId='${payload.userbasicId}') ORDER BY createdAt DESC; `;
    // let query = `SELECT * from chat where userbasicId='${payload.userbasicId}' and recieverBasicId='${payload.recieverBasicId}' `;
    console.log(query);
    let myMessages = entityManager.query(query);
    return myMessages;
  }
}
