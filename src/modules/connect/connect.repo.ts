import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';
import { getManager, Repository } from 'typeorm';
import { UserBasic } from '../user/entities/user-basic.entity';
import { ConnectTransactionEntity } from './entities/connect-transaction-entity';
import { RechargeHistory } from './entities/recharge-history.entity';
import { UserConnectDurationLog } from './entities/user-connect-duration-log';
import { UserConnectDuration } from './entities/user-connect-duration.entity';
import { UserConnectLog } from './entities/user-connect-log.entity';
import { UserConnect } from './entities/user-connect.entity';
import { UserRequest } from './entities/user-request.entity';

@Injectable()
export class ConnectRepo {
  constructor(
    @InjectRepository(UserConnect)
    private readonly userConnectRepo: Repository<UserConnect>,
    @InjectRepository(UserConnectLog)
    private readonly userConnectLogRepo: Repository<UserConnectLog>,
    @InjectRepository(RechargeHistory)
    private readonly rechargeHistoryRepo: Repository<RechargeHistory>,
    @InjectRepository(UserRequest)
    private readonly userRequestRepo: Repository<UserRequest>,
    @InjectRepository(UserConnectDuration)
    private readonly userConnectDurationRepo: Repository<UserConnectDuration>,
    @InjectRepository(UserConnectDurationLog)
    private readonly userConnectDurationLogRepo: Repository<UserConnectDurationLog>,
    @InjectRepository(ConnectTransactionEntity)
    private readonly connectTransactionRepo: Repository<ConnectTransactionEntity>,
  ) {}
  async createUserConnect(userConnect: UserConnect) {
    return await this.userConnectRepo.save(userConnect);
  }

  async createUserConnectLog(userConnectLog: UserConnectLog) {
    return await this.userConnectLogRepo.save(userConnectLog);
  }

  async getUserConnectByUserBasic(userBasic: UserBasic) {
    return await this.userConnectRepo.findOne({
      where: {
        userBasic: userBasic,
      },
    });
  }

  async addConnectTransaction(
    userBasic: UserBasic,
    operation: number,
    externalId?: string,
  ) {
    const connectTransaction = ConnectTransactionEntity.create(
      userBasic,
      operation,
      externalId,
    );
    return await this.connectTransactionRepo.save(connectTransaction);
  }

  async getRechargeHistory(userBasic: UserBasic) {
    return await this.rechargeHistoryRepo.find({
      where: {
        userBasic: userBasic,
      },
    });
  }

  async updateUserConnect(userConnect: UserConnect) {
    return await this.userConnectRepo.save({ ...userConnect });
  }

  async createRechargeHistory(rechargeHistory: RechargeHistory) {
    return await this.rechargeHistoryRepo.save(rechargeHistory);
  }

  async getRechargeHistoryByUserBasic(userBasic: UserBasic) {
    return await this.rechargeHistoryRepo.find({
      where: {
        userBasic: userBasic,
      },
    });
  }

  async getAllRechargeHistory() {
    return await this.rechargeHistoryRepo.find();
  }

  async getAllUserRequest() {
    const entityManager = getManager();
    let rawQuery = `select ctl.id as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation ,
    ctl.userRequestState,
    ctl.userRequestStatus,
    ctl.acceptanceRejectionDate,
    ctl.requestDate,
    uva.id as userId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
    from user_requests ctl
    join users_view_admin uva on
    ctl.requestingUserBasicId = uva.id group by uva.id;`;
    const userDet = await entityManager.query(rawQuery);
    return userDet;
  }

  async getUserRequestById(id: string) {
    return await this.userRequestRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateUserRequest(userRequest: UserRequest) {
    return await this.userRequestRepo.save({ ...userRequest });
  }

  async createUserRequest(userRequest: UserRequest) {
    return await this.userRequestRepo.save(userRequest);
  }

  async getRequestValidation(
    requestedUserBasicId: string,
    requestingUserBasicId: string,
  ) {
    return await this.userRequestRepo.findOne({
      where: [
        {
          requestedUserBasicId: requestingUserBasicId,
          requestingUserBasicId: requestedUserBasicId,
        },
        {
          requestedUserBasicId: requestedUserBasicId,
          requestingUserBasicId: requestingUserBasicId,
        },
      ],
    });
  }

  async getUserRequestStatusForAppPrefAndFilter(userBasicId: string) {
    return await this.userRequestRepo.find({
      where: [
        {
          requestedUserBasicId: userBasicId,
        },
        {
          requestingUserBasicId: userBasicId,
        },
      ],
    });
  }

  async getActiveSentRequest(userBasicId: string) {
    return await this.userRequestRepo.find({
      where: {
        requestingUserBasicId: userBasicId,
        userRequestStatus: UserRequestStatus.Pending,
      },
    });
  }

  async getActiveInvites(userBasicId: string) {
    return await this.userRequestRepo.find({
      where: {
        requestedUserBasicId: userBasicId,
        userRequestStatus: UserRequestStatus.Pending,
      },
    });
  }

  async getActiveConnections(userBasicId: string) {
    return await this.userRequestRepo.find({
      where: {
        requestedUserBasicId: userBasicId,
        userRequestStatus: UserRequestStatus.Accepted,
      },
    });
  }

  async createUserConnectDuration(userConnectDuration: UserConnectDuration) {
    return await this.userConnectDurationRepo.save(userConnectDuration);
  }

  async updateUserConnectDuration(userConnectDuration: UserConnectDuration) {
    return await this.userConnectDurationRepo.save({ ...userConnectDuration });
  }

  async getConnectDurationById(userConnectDurationId: string) {
    return await this.userConnectDurationRepo.findOne({
      where: {
        id: userConnectDurationId,
      },
      relations: ['userConnectDurationLogs'],
    });
  }

  async getUserConnectDurationByUserIds(
    userOneBasicId: string,
    userTwoBasicId: string,
  ) {
    return await this.userConnectDurationRepo.find({
      where: [
        {
          userOneBasicId: userOneBasicId,
          userTwoBasicId: userTwoBasicId,
        },
        {
          userTwoBasicId: userOneBasicId,
          userOneBasicId: userTwoBasicId,
        },
      ],
    });
  }

  async getUserConnectRequestsByUserId(userBasicId: string) {
    return await this.userConnectDurationRepo.find({
      where: [
        {
          userOneBasicId: userBasicId,
          isActive: true,
        },
        {
          userTwoBasicId: userBasicId,
          isActive: true,
        },
      ],
    });
  }

  async getUserConnectDurationByUserIdsActive(
    userOneBasicId: string,
    userTwoBasicId: string,
  ) {
    return await this.userConnectDurationRepo.find({
      where: [
        {
          userOneBasicId: userOneBasicId,
          userTwoBasicId: userTwoBasicId,
          isActive: true,
        },
        {
          userTwoBasicId: userOneBasicId,
          userOneBasicId: userTwoBasicId,
          isActive: true,
        },
      ],
    });
  }

  async createUserConnectDurationLog(logObj: UserConnectDurationLog) {
    return await this.userConnectDurationLogRepo.save(logObj);
  }

  async getUserConnectRequestById(userConnectRequestId: string) {
    return await this.userConnectDurationRepo.findOne({
      where: {
        id: userConnectRequestId,
      },
    });
  }

  async getUserConnectDurationAllUserActive(userBasicId: string) {
    const entityManager = getManager();
    const rawQuery = `select uva.id as userId,
    ucd.id as connectId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
from user_connect_durations ucd
      left join users_view_admin uva on
     (ucd.userOneBasicId = uva.id and ucd.userOneBasicId <> '${userBasicId}')
     or (ucd.userTwoBasicId = uva.id and ucd.userTwoBasicId <> '${userBasicId}')
WHERE ucd.isActive
AND (ucd.userOneBasicId = '${userBasicId}'
 OR ucd.userTwoBasicId = '${userBasicId}');`;
    const userDet = await entityManager.query(rawQuery);
    return userDet;
  }

  async getmyTransactions(userBasicId: string) {
    const entityManager = getManager();

    const rawQuery = `select ctl.id        as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation as transactionType,
    uva.id        as userId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
from connect_transaction_log ctl
      left join users_view_admin uva on
 ctl.external_id = uva.id
where ctl.userBasicId = '${userBasicId}';`;
    const transactions = await entityManager.query(rawQuery);
    return transactions;
  }
  async getAllTransactions() {
    const entityManager = getManager();
    const rawQuery = `select ctl.id as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation as transactionType,
    uva.id        as userId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
from connect_transaction_log ctl
       join users_view_admin uva on
 ctl.external_id = uva.id;`;
    console.log('here');
    const transactions = await entityManager.query(rawQuery);
    console.log(transactions);
    return transactions;
  }
}
