import { Repository } from 'typeorm';
import { Meet } from './entities/meet.entity';
export declare class MeetService {
    private readonly meet;
    constructor(meet: Repository<Meet>);
    createMeet(meeObject: any): Promise<Meet>;
    updateMeet(meetId: any, meetData: any): Promise<Meet>;
}
