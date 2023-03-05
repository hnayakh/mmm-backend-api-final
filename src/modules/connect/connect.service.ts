import { Injectable } from '@nestjs/common';
import {
  PaymentStatus,
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';
import { Connect } from '../master/entities/connect.entity';
import { UserBasic } from '../user/entities/user-basic.entity';
import { ConnectRepo } from './connect.repo';
import { RechargeHistoryDto } from './dtos/recharge-history.dto';
import {
  UserConnectDurationDto,
  UserConnectRequestDto,
} from './dtos/user-connect-duration.dto';
import { UserRequestDto } from './dtos/user-request.dto';
import { RechargeHistory } from './entities/recharge-history.entity';
import { UserConnectDurationLog } from './entities/user-connect-duration-log';
import { UserConnectDuration } from './entities/user-connect-duration.entity';
import { UserConnectLog } from './entities/user-connect-log.entity';
import { UserConnect } from './entities/user-connect.entity';
import { UserRequest } from './entities/user-request.entity';

@Injectable()
export class ConnectService {
  constructor(private readonly connectRepo: ConnectRepo) {}

  async updateUserConnects(
    userConnect: UserConnect,
    connectCount: number,
    userBasic: UserBasic,
    operation: string,
  ) {
    userConnect.updateUserConnect(connectCount, operation);
    return await this.connectRepo.updateUserConnect(userConnect);
  }
  async createUserConnects(connectCount: number, userBasic: UserBasic) {
    const uc = UserConnect.createUserConnect(connectCount, userBasic);
    return await this.connectRepo.createUserConnect(uc);
  }
  async createUserConnectLogs(
    prevConnectBalance: number,
    currentConnectBalance: number,
    changeAmount: number,
    operation: number,
    reason: string,
    userBasic: UserBasic,
  ) {
    const ucl = UserConnectLog.createUserConnectLogs(
      prevConnectBalance,
      currentConnectBalance,
      changeAmount,
      operation,
      reason,
      userBasic,
    );
    return await this.connectRepo.createUserConnectLog(ucl);
  }
  async createRechargeHistory(input: RechargeHistoryDto, userBasic: UserBasic) {
    const rh = RechargeHistory.createRechargeHistory(
      input.actualAmount,
      input.discountedAmount,
      input.isCouponApplied,
      input.couponCode,
      input.connectCount,
      input.date,
      input.modeOfPayment,
      input.transactionId,
      input.paymentStatus,
      input.failureReason,
      userBasic,
    );
    return await this.connectRepo.createRechargeHistory(rh);
  }

  async getRechargeHistory(userBasic: UserBasic) {
    return await this.connectRepo.getRechargeHistory(userBasic);
  }
  async getAllRechargeHistory() {
    return await this.connectRepo.getAllRechargeHistory();
  }
  async getAllUserRequest() {
    return await this.connectRepo.getAllUserRequest();
  }

  async getUserConnect(userBasic: UserBasic) {
    return await this.connectRepo.getUserConnectByUserBasic(userBasic);
  }

  async addConnectTransaction(
    userOneBasic: UserBasic,
    operation: number,
    externalId?: string,
  ) {
    return await this.connectRepo.addConnectTransaction(
      userOneBasic,
      operation,
      externalId,
    );
  }
  async createOrUpdateUserRequest(userRequestDto: UserRequestDto) {
    // 0 = Add
    // 1 = Accept
    // 2 = Reject
    // 3 = Revert
    // 4 = RemovedByRequestedUser
    // 5 = RemovedByRequestingUser
    try {
      const userRequest = await this.connectRepo.getUserRequestById(
        userRequestDto.userRequestId,
      );
      if (userRequest != null) userRequest.operation = userRequestDto.operation;
      switch (userRequestDto.operation) {
        case 0:
          const existingRequest = await this.connectRepo.getRequestValidation(
            userRequestDto.requestedUserBasicId,
            userRequestDto.requestingUserBasicId,
          );
          console.log('userRequest', userRequest);
          console.log('userRequest', existingRequest);
          // TODO: This needs to be checked from both side.
          if (existingRequest != null) {
            existingRequest.requestingUserBasicId =
              userRequestDto.requestingUserBasicId;
            existingRequest.requestedUserBasicId =
              userRequestDto.requestedUserBasicId;
            existingRequest.userRequestStatus = UserRequestStatus.Pending;
            existingRequest.userRequestState = UserRequestState.NotConnected;
            return await this.connectRepo.updateUserRequest(existingRequest);
          }
          const userReq = UserRequest.createUserRequest(
            userRequestDto.requestingUserBasicId,
            userRequestDto.requestedUserBasicId,
          );
          return await this.connectRepo.createUserRequest(userReq);
        case 1:
          userRequest.userRequestStatus = UserRequestStatus.Accepted;
          userRequest.userRequestState = UserRequestState.Active;
          return await this.connectRepo.updateUserRequest(userRequest);
        case 2:
          userRequest.userRequestStatus = UserRequestStatus.Rejected;
          userRequest.userRequestState = UserRequestState.NotConnected;
          return await this.connectRepo.updateUserRequest(userRequest);
        case 3:
          userRequest.userRequestStatus = UserRequestStatus.Reverted;
          userRequest.userRequestState = UserRequestState.NotConnected;
          return await this.connectRepo.updateUserRequest(userRequest);
        case 4:
          userRequest.userRequestStatus = UserRequestStatus.Reverted;
          userRequest.userRequestState =
            UserRequestState.RemovedByRequestingUser;
          return await this.connectRepo.updateUserRequest(userRequest);
        case 5:
          userRequest.userRequestStatus = UserRequestStatus.Rejected;
          userRequest.userRequestState =
            UserRequestState.RemovedByRequestedUser;
          return await this.connectRepo.updateUserRequest(userRequest);
        default:
          return userRequest;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserRequestById(id: string) {
    return await this.connectRepo.getUserRequestById(id);
  }

  async getActiveSentRequest(userBasicId: string) {
    return await this.connectRepo.getActiveSentRequest(userBasicId);
  }

  async getActiveInvites(userBasicId: string) {
    return await this.connectRepo.getActiveInvites(userBasicId);
  }

  async getActiveConnections(userBasicId: string) {
    return await this.connectRepo.getActiveConnections(userBasicId);
  }
  async getActiveSentConnections(userBasicId: string) {
    return await this.connectRepo.getActiveSentConnections(userBasicId);
  }

  async getUserRequestStatusForAppPrefAndFilter(userBasicId: string) {
    return await this.connectRepo.getUserRequestStatusForAppPrefAndFilter(
      userBasicId,
    );
  }

  async createUserConnectDuration(
    input: UserConnectDurationDto,
    masterConnect: Connect,
  ) {
    // Check both the users are previously connected or not
    let prevConnectedObj =
      await this.connectRepo.getUserConnectDurationByUserIds(
        input.userOneBasicId,
        input.userTwoBasicId,
      );
    let obj = UserConnectDuration.createUserConnectDuration(
      input.userOneBasicId,
      input.userTwoBasicId,
      input.usedDuration,
      prevConnectedObj.length == 0
        ? masterConnect.firstTimeBenifitMins
        : masterConnect.secondTimeBenifitMins,
      true,
    );

    if (obj.usedDuration >= obj.totalDuration) {
      obj.isActive = false;
    }
    const createdDurationObj = await this.connectRepo.createUserConnectDuration(
      obj,
    );
    let logObj = UserConnectDurationLog.createUserConnectDurationLogs(
      input.usedDuration,
      createdDurationObj,
    );
    await this.connectRepo.createUserConnectDurationLog(logObj);
    return createdDurationObj;
  }

  async createUserConnectDurationLog(
    input: UserConnectDurationDto,
    userConnectReqObj: UserConnectDuration,
  ) {
    userConnectReqObj.usedDuration += input.usedDuration;
    if (userConnectReqObj.usedDuration >= userConnectReqObj.totalDuration) {
      userConnectReqObj.isActive = false;
    }
    await this.connectRepo.updateUserConnectDuration(userConnectReqObj);
    let logObj = UserConnectDurationLog.createUserConnectDurationLogs(
      input.usedDuration,
      userConnectReqObj,
    );
    return await this.connectRepo.createUserConnectDurationLog(logObj);
  }

  async createUserConnectRequest(
    input: UserConnectRequestDto,
    masterConnect: Connect,
  ) {
    // Check both the users are previously connected or not
    let prevConnectedObj =
      await this.connectRepo.getUserConnectDurationByUserIds(
        input.userOneBasicId,
        input.userTwoBasicId,
      );
    let obj = UserConnectDuration.createUserConnectDuration(
      input.userOneBasicId,
      input.userTwoBasicId,
      0,
      prevConnectedObj.length == 0
        ? masterConnect.firstTimeBenifitMins
        : masterConnect.secondTimeBenifitMins,
      true,
    );
    const createdDurationObj = await this.connectRepo.createUserConnectDuration(
      obj,
    );
    return createdDurationObj;
  }

  async updateUserConnectDuration(
    input: UserConnectDurationDto,
    masterConnect: Connect,
  ) {
    let connectDuration = await this.connectRepo.getConnectDurationById(
      input.userConnectRequestId,
    );
    connectDuration.usedDuration += input.usedDuration;
    if (connectDuration.usedDuration >= connectDuration.totalDuration) {
      connectDuration.isActive = false;
    }
    let logObj = UserConnectDurationLog.createUserConnectDurationLogs(
      input.usedDuration,
      connectDuration,
    );
    await this.connectRepo.createUserConnectDurationLog(logObj);
    return await this.connectRepo.updateUserConnectDuration(connectDuration);
  }

  async updateUserConnectRequest(
    input: UserConnectRequestDto,
    masterConnect: Connect,
  ) {
    console.log('ewhjgewjh');
    let connectDuration = await this.connectRepo.getConnectDurationById(
      input.userConnectRequestId,
    );
    // connectDuration.isActive = false;
    try {
      console.log('connectDuration', connectDuration);
      let result = await this.connectRepo.updateUserConnectDuration(
        connectDuration,
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserConnectDurationByUserIdsActive(
    userOneBasicId: string,
    userTwoBasicId: string,
  ) {
    return await this.connectRepo.getUserConnectDurationByUserIdsActive(
      userOneBasicId,
      userTwoBasicId,
    );
  }

  async getUserConnectDurationByUserIds(
    userOneBasicId: string,
    userTwoBasicId: string,
  ) {
    return await this.connectRepo.getUserConnectDurationByUserIds(
      userOneBasicId,
      userTwoBasicId,
    );
  }

  async getUserConnectRequestById(userConnectRequestId: string) {
    return await this.connectRepo.getUserConnectRequestById(
      userConnectRequestId,
    );
  }

  async getUserConnectRequestsByUserId(userBasicId: string) {
    return await this.connectRepo.getUserConnectRequestsByUserId(userBasicId);
  }

  async getUserConnectDurationAllUserActive(userOneBasicId: string) {
    return await this.connectRepo.getUserConnectDurationAllUserActive(
      userOneBasicId,
    );
  }

  async getConnectTransactions(userBasicId: string) {
    const transactions = await this.connectRepo.getmyTransactions(userBasicId);
    return transactions;
  }
  async getalluserConnectTransactions() {
    const transactions = await this.connectRepo.getAllTransactions();
    return transactions;
  }
}
