import { Repository } from 'typeorm';
import { MessageDto } from './dtos/message.dto';
import { Chat } from './entity/chat.entity';
export declare class ChatRepo {
    protected readonly chatEntity: Repository<Chat>;
    constructor(chatEntity: Repository<Chat>);
    allMessages(): Promise<{
        userbasicId: string;
        rhewuiryuewr: string;
    }>;
    sendMessage(MessageDto: MessageDto): Promise<void>;
    MyMessage(payload: any): Promise<any>;
}
