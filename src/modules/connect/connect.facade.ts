import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ActivationStatus,
  PaymentStatus,
  ProfileUpdationStatus,
  RegistrationSteps,
} from 'src/shared/enums/miscellaneous.enum';
import { S3Service } from 'src/shared/services/s3.service';
import { MasterService } from '../master/master.service';
import * as app_root from 'app-root-path';
import * as _ from 'lodash';
import { ConnectService } from './connect.service';
import { RechargeHistoryDto } from './dtos/recharge-history.dto';
import { UserService } from '../user/user.service';
import { UserRequestDto } from './dtos/user-request.dto';
import {
  UserConnectDurationDto,
  UserConnectRequestDto,
} from './dtos/user-connect-duration.dto';

@Injectable()
export class ConnectFacade {
  constructor(
    private readonly connectService: ConnectService,
    private readonly userService: UserService,
    private readonly masterService: MasterService,
  ) {}
  async getAllNotification(userBasicId: string) {
    try {
      return await this.userService.getAllNotification(userBasicId);
    } catch (err) {
      console.log(err);
    }
  }
  async getUserRequestDetails(userBasicId: string) {
    try {
      const activeSent = await this.connectService.getActiveSentRequest(
        userBasicId,
      );
      const activeInvites = await this.connectService.getActiveInvites(
        userBasicId,
      );
      const activeconnections = await this.connectService.getActiveConnections(
        userBasicId,
      );
      const activeSentconnections =
        await this.connectService.getActiveSentConnections(userBasicId);
      console.log('activeconnections', activeSentconnections);

      let requiredConnection = [...activeconnections, ...activeSentconnections];
      console.log('requiredConnection', requiredConnection);
      let userBasicIds = [];
      // Get userBasicIds
      activeSent.forEach((input) => {
        userBasicIds.push(input.requestedUserBasicId);
        userBasicIds.push(input.requestingUserBasicId);
      });
      activeInvites.forEach((input) => {
        userBasicIds.push(input.requestedUserBasicId);
        userBasicIds.push(input.requestingUserBasicId);
      });
      requiredConnection.forEach((input) => {
        userBasicIds.push(input.requestedUserBasicId);
        userBasicIds.push(input.requestingUserBasicId);
      });

      const users = await this.userService.getUsersByIds(userBasicIds);
      const connectedUserForCall =
        await this.connectService.getUserConnectRequestsByUserId(userBasicId);
      activeSent.forEach((input) => {
        input['user'] = users.find(
          (x) => x.id == input['requestedUserBasicId'],
        );
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let isConnectOne = connectedUserForCall.find(
          (u) => u.userOneBasicId == input['requestedUserBasicId'],
        );
        if (isConnectOne != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
        }
        let isConnectTwo = connectedUserForCall.find(
          (u) => u.userTwoBasicId == input['requestedUserBasicId'],
        );
        if (isConnectTwo != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
        }
        input['user']['connectStatus'] = tempObj;
        input['requestingUserDeatails'] = users.find(
          (x) => x.id == input['requestingUserBasicId'],
        );
      });

      activeInvites.forEach((input) => {
        input['requestedUserDeatails'] = users.find(
          (x) => x.id == input['requestedUserBasicId'],
        );
        input['user'] = users.find(
          (x) => x.id == input['requestingUserBasicId'],
        );
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let isConnectOne = connectedUserForCall.find(
          (u) => u.userOneBasicId == input['requestingUserBasicId'],
        );
        if (isConnectOne != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
        }
        let isConnectTwo = connectedUserForCall.find(
          (u) => u.userTwoBasicId == input['requestingUserBasicId'],
        );
        if (isConnectTwo != null) {
          (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
        }
        input['user']['connectStatus'] = tempObj;
      });

      requiredConnection.forEach((input) => {
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let requiredObj = {};
        if (userBasicId == input['requestedUserBasicId']) {
          input['user'] = users.find(
            (x) => x.id == input['requestingUserBasicId'],
          );
          let isConnectOne = connectedUserForCall.find(
            (u) => u.userOneBasicId == input['requestingUserBasicId'],
          );
          if (isConnectOne != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            requiredObj = isConnectOne;
          }
        } else {
          input['user'] = users.find(
            (x) => x.id == input['requestedUserBasicId'],
          );
          let isConnectTwo = connectedUserForCall.find(
            (u) => u.userTwoBasicId == input['requestedUserBasicId'],
          );
          if (isConnectTwo != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            requiredObj = isConnectTwo;
          }
        }
        input['user']['connectStatus'] = tempObj;
        input['user']['UserRequestStatus'] = requiredObj;
        input['requestedUserDeatails'] = users.find(
          (x) => x.id == input['requestedUserBasicId'],
        );
        input['requestingUserDeatails'] = users.find(
          (x) => x.id == input['requestingUserBasicId'],
        );
      });
      console.log('activeconactiveconnections', requiredConnection);
      return {
        activeSent,
        activeconnections: requiredConnection,
        activeInvites,
      };
    } catch (err) {
      console.log(err);   
      return {};
    }
  }

  async createOrUpdateUserRequest(userRequestDto: UserRequestDto) {
    return await this.connectService.createOrUpdateUserRequest(userRequestDto);
  }

  async getRechargeHistory(userBasicId: string) {
    const userBasic = await this.userService.getUserById(userBasicId);
    const rechargeHistory = await this.connectService.getRechargeHistory(
      userBasic,
    );
    return rechargeHistory;
  }
  async getAllRechargeHistory() {
    const rechargeHistory = await this.connectService.getAllRechargeHistory();
    return rechargeHistory;
  }

  async createRechargeHistory(rechargeHistoryDto: RechargeHistoryDto) {
    const userBasic = await this.userService.getUserById(
      rechargeHistoryDto.userBasicId,
    );
    if (_.isEmpty(userBasic)) {
      throw new HttpException('User not found.', HttpStatus.EXPECTATION_FAILED);
    }
    // Create the record in recharge_history table
    const rechargeObject = await this.connectService.createRechargeHistory(
      rechargeHistoryDto,
      userBasic,
    );
    if (
      rechargeHistoryDto.paymentStatus == PaymentStatus.Pending ||
      rechargeHistoryDto.paymentStatus == PaymentStatus.Failed
    ) {
      return rechargeObject;
    }
    // Get user_connects
    const userConnect = await this.connectService.getUserConnect(userBasic);
    let prevConnectBalance = _.isEmpty(userConnect)
      ? 0
      : userConnect.connectBalance;
    if (_.isEmpty(userConnect)) {
      await this.connectService.createUserConnects(
        rechargeHistoryDto.connectCount,
        userBasic,
      );
    } else {
      await this.connectService.updateUserConnects(
        userConnect,
        rechargeHistoryDto.connectCount,
        userBasic,
        'add',
      );
    }
    // Update the user_connect_logs and user_connects
    await this.connectService.createUserConnectLogs(
      prevConnectBalance,
      prevConnectBalance + rechargeHistoryDto.connectCount,
      rechargeHistoryDto.connectCount,
      1,
      'Added connect.',
      userBasic,
    );
    return rechargeObject;
  }

  async getUserConnect(userBasicId: string) {
    const userBasic = await this.userService.getUserById(userBasicId);
    return await this.connectService.getUserConnect(userBasic);
  }

  async createOrUpdateUserConnectDuration(
    userConnectDurationDto: UserConnectDurationDto,
  ) {
    let userConnectReqObj = await this.connectService.getUserConnectRequestById(
      userConnectDurationDto.userConnectRequestId,
    );
    console.log('userConnectReqObj', userConnectReqObj);
    if (userConnectReqObj == null) {
      throw new HttpException('Invalid Id', HttpStatus.EXPECTATION_FAILED);
    }
    return await this.connectService.createUserConnectDurationLog(
      userConnectDurationDto,
      userConnectReqObj,
    );
  }
  async getAllUserRequest() {
    //  const userBasic = await this.userService.getUserById(userBasicId);
    return await this.connectService.getAllUserRequest();
  }
  async createOrUpdateUserConnectRequest(
    userConnectRequestDto: UserConnectRequestDto,
  ) {
    let masterConnect = await this.masterService.getConnects();
    const userOneBasic = await this.userService.getUserById(
      userConnectRequestDto.userOneBasicId,
    );
    if (
      userConnectRequestDto.userConnectRequestId == '' ||
      userConnectRequestDto.userConnectRequestId == null
    ) {
      console.log('here');
      try {
        const userOneConnect = await this.connectService.getUserConnect(
          userOneBasic,
        );
        console.log('userOneConnect', userOneConnect);
        // const userTwoConnect = await this.connectService.getUserConnect(userTwoBasic);

        await this.connectService.updateUserConnects(
          userOneConnect,
          1,
          userOneBasic,
          userConnectRequestDto.type,
        );
        await this.connectService.addConnectTransaction(
          userOneBasic,
          0,
          userConnectRequestDto.userTwoBasicId,
        );
        // await this.connectService.updateUserConnects(
        //   userTwoConnect,
        //   1,
        //   userTwoBasic,
        //   'remove'
        // );
        // Create user connect duration
        return await this.connectService.createUserConnectRequest(
          userConnectRequestDto,
          masterConnect[0],
        );
      } catch (error) {
        return error;
      }
    } else {
      console.log('then');
      try {
        await this.connectService.addConnectTransaction(
          userOneBasic,
          0,
          userConnectRequestDto.userTwoBasicId,
        );
        return await this.connectService.updateUserConnectRequest(
          userConnectRequestDto,
          masterConnect[0],
        );
      } catch (errorLog) {
        console.log(errorLog);
        return errorLog;
      }
    }
  }

  async getUserConnectDuration(userConnectDurationDto: any) {
    let respObj = {
      minutesLeft: 0,
      userConnectRequestId: null,
    };
    const obj = await this.connectService.getUserConnectDurationByUserIdsActive(
      userConnectDurationDto.userOneBasicId,
      userConnectDurationDto.userTwoBasicId,
    );
    if (obj.length == 0) {
      let masterConnect = await this.masterService.getConnects();
      const objExist =
        await this.connectService.getUserConnectDurationByUserIds(
          userConnectDurationDto.userOneBasicId,
          userConnectDurationDto.userTwoBasicId,
        );
      respObj.minutesLeft =
        objExist.length == 0
          ? masterConnect[0].firstTimeBenifitMins
          : masterConnect[0].secondTimeBenifitMins;
    } else {
      respObj.minutesLeft = obj[0].totalDuration - obj[0].usedDuration;
      respObj.userConnectRequestId = obj[0].id;
    }
    return respObj;
  }
  async getAllUserConnectDuration(userBasicId: any) {
    let respObj = {
      minutesLeft: 0,
      userConnectRequestId: null,
    };
    const obj = await this.connectService.getUserConnectDurationAllUserActive(
      userBasicId,
    );
    // if (obj.length == 0) {
    //   let masterConnect = await this.masterService.getConnects();
    //   const objExist = await this.connectService.getUserConnectDurationByUserIds(userConnectDurationDto.userOneBasicId, userConnectDurationDto.userTwoBasicId);
    //   respObj.minutesLeft = objExist.length == 0 ? masterConnect[0].firstTimeBenifitMins : masterConnect[0].secondTimeBenifitMins;
    // } else {
    //   respObj.minutesLeft = obj[0].totalDuration - obj[0].usedDuration;
    //   respObj.userConnectRequestId = obj[0].id;
    // }
    return obj;
  }

  async getConnectTransaction(userBasicId: string) {
    return await this.connectService.getConnectTransactions(userBasicId);
  }

  async getalluserConnectTransactions() {
    return await this.connectService.getalluserConnectTransactions();
  }
}
