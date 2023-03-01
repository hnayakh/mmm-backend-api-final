import { ConnectFacade } from './connect.facade';
import { RechargeHistoryDto } from './dtos/recharge-history.dto';
import { UserConnectDurationDto, UserConnectRequestDto } from './dtos/user-connect-duration.dto';
import { UserRequestDto } from './dtos/user-request.dto';
export declare class ConnectController {
    private readonly connectFacade;
    constructor(connectFacade: ConnectFacade);
    createRechargeHistory(rechargeHistoryDto: RechargeHistoryDto): Promise<{
        data: import("./entities/recharge-history.entity").RechargeHistory;
        message: string;
    }>;
    getRechargeHistory(userBasicId: string): Promise<{
        data: import("./entities/recharge-history.entity").RechargeHistory[];
        message: string;
    }>;
    getAllRecharge(): Promise<{
        data: import("./entities/recharge-history.entity").RechargeHistory[];
        message: string;
    }>;
    getUserConnect(userBasicId: string): Promise<{
        data: import("./entities/user-connect.entity").UserConnect;
        message: string;
    }>;
    createOrUpdateUserRequest(userRequestDto: UserRequestDto): Promise<{
        data: import("./entities/user-request.entity").UserRequest;
        message: string;
    }>;
    getUserRequestDetails(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    createOrUpdateUserConnectRequest(userConnectRequestDto: UserConnectRequestDto): Promise<{
        data: any;
        message: string;
    }>;
    getAllUserRequest(): Promise<{
        data: any;
        message: string;
    }>;
    createOrUpdateUserConnectDuration(userConnectDurationDto: UserConnectDurationDto): Promise<{
        data: import("./entities/user-connect-duration-log").UserConnectDurationLog;
        message: string;
    }>;
    getUserConnectDuration(userOneBasicId: string, userTwoBasicId: string): Promise<{
        data: {
            minutesLeft: number;
            userConnectRequestId: any;
        };
        message: string;
    }>;
    getUserallConnect(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getuserConnectTransactions(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getalluserConnectTransactions(): Promise<{
        data: any;
        message: string;
    }>;
}
