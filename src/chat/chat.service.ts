import { Injectable } from '@nestjs/common';
import { ChatRepo } from './chat.repo';

@Injectable()
export class ChatService {
  constructor(private readonly ChatRepo: ChatRepo) {}

  async allMessages(payload:any){
    console.log(payload)
    return await this.ChatRepo.allMessages()
  }
async sendMessage(payload){
    return await this.ChatRepo.sendMessage(payload)
}
async MyMessage(payload){
    return await this.ChatRepo.MyMessage(payload)
}

}
