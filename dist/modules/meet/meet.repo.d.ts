import { Meet } from './entities/meet.entity';
import { Repository } from 'typeorm';
export declare class MeetRepo {
    private readonly meet;
    constructor(meet: Repository<Meet>);
    getMeetRequestByUserId(userBasicId: string): Promise<Meet[]>;
    getActiveSentRequest(userBasicId: string): Promise<Meet[]>;
    getActiveInvites(userBasicId: string): Promise<Meet[]>;
    getActiveConnections(userBasicId: string): Promise<Meet[]>;
    getActiveSentConnections(userBasicId: string): Promise<Meet[]>;
}
