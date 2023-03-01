import { MasterService } from '../master/master.service';
import { ConnectService } from './connect.service';
import { RechargeHistoryDto } from './dtos/recharge-history.dto';
import { UserService } from '../user/user.service';
import { UserRequestDto } from './dtos/user-request.dto';
import { UserConnectDurationDto, UserConnectRequestDto } from './dtos/user-connect-duration.dto';
export declare class ConnectFacade {
    private readonly connectService;
    private readonly userService;
    private readonly masterService;
    constructor(connectService: ConnectService, userService: UserService, masterService: MasterService);
    getUserRequestDetails(userBasicId: string): Promise<any>;
    createOrUpdateUserRequest(userRequestDto: UserRequestDto): Promise<import("./entities/user-request.entity").UserRequest>;
    getRechargeHistory(userBasicId: string): Promise<import("./entities/recharge-history.entity").RechargeHistory[]>;
    getAllRechargeHistory(): Promise<import("./entities/recharge-history.entity").RechargeHistory[]>;
    createRechargeHistory(rechargeHistoryDto: RechargeHistoryDto): Promise<import("./entities/recharge-history.entity").RechargeHistory>;
    getUserConnect(userBasicId: string): Promise<import("./entities/user-connect.entity").UserConnect>;
    createOrUpdateUserConnectDuration(userConnectDurationDto: UserConnectDurationDto): Promise<import("./entities/user-connect-duration-log").UserConnectDurationLog>;
    getAllUserRequest(): Promise<any>;
    createOrUpdateUserConnectRequest(userConnectRequestDto: UserConnectRequestDto): Promise<any>;
    getUserConnectDuration(userConnectDurationDto: any): Promise<{
        minutesLeft: number;
        userConnectRequestId: any;
    }>;
    getAllUserConnectDuration(userBasicId: any): Promise<any>;
    getConnectTransaction(userBasicId: string): Promise<any>;
    getalluserConnectTransactions(): Promise<any>;
}
