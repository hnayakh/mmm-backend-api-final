import { Repository } from 'typeorm';
import { Meet } from './entities/meet.entity';
import { MeetRepo } from './meet.repo';
import { UserService } from '../user/user.service';
export declare class MeetService {
    private readonly meetRepo;
    private readonly userService;
    private readonly meet;
    constructor(meetRepo: MeetRepo, userService: UserService, meet: Repository<Meet>);
    createMeet(meeObject: any): Promise<Meet>;
    updateMeet(meetId: any, meetData: any): Promise<Meet>;
    getMeet(userBasicId: string): Promise<{
        activeSent: Meet[];
        activeconnections: Meet[];
        activeInvites: Meet[];
    } | {
        activeSent?: undefined;
        activeconnections?: undefined;
        activeInvites?: undefined;
    }>;
}
