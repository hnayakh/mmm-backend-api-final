import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserRequestState, UserRequestStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class UserRequest extends AbstarctEntity {
    requestingUserBasicId: string;
    requestedUserBasicId: string;
    userRequestStatus: UserRequestStatus;
    userRequestState: UserRequestState;
    requestDate: string;
    acceptanceRejectionDate: string;
    operation: number;
    static createUserRequest(requestingUserBasicId: string, requestedUserBasicId: string): UserRequest;
}
