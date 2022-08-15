import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import {
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';

@Entity('user_requests')
export class UserRequest extends AbstarctEntity {
  @Column()
  requestingUserBasicId: string;

  @Column()
  requestedUserBasicId: string;

  @Column()
  userRequestStatus: UserRequestStatus;

  @Column()
  userRequestState: UserRequestState;

  @Column()
  requestDate: string;

  @Column({ nullable: true })
  acceptanceRejectionDate: string;

  // 0 = Add
  // 1 = Accept
  // 2 = Reject
  // 3 = Revert
  // 4 = RemovedByRequestedUser
  // 5 = RemovedByRequestingUser
  @Column()
  operation: number;

  static createUserRequest(
    requestingUserBasicId: string,
    requestedUserBasicId: string,
  ) {
    const userRequest = new UserRequest();
    userRequest.requestingUserBasicId = requestingUserBasicId;
    userRequest.requestedUserBasicId = requestedUserBasicId;
    userRequest.userRequestStatus = UserRequestStatus.Pending;
    userRequest.userRequestState = UserRequestState.NotConnected;
    userRequest.requestDate = new Date().toString();
    userRequest.operation = 0;
    return userRequest;
  }
}
