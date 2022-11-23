import { ChatRepo } from './chat.repo';
export declare class ChatService {
    private readonly ChatRepo;
    constructor(ChatRepo: ChatRepo);
    allMessages(payload: any): Promise<{
        userbasicId: string;
        rhewuiryuewr: string;
    }>;
    sendMessage(payload: any): Promise<void>;
    MyMessage(payload: any): Promise<any>;
}
