import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConnectFacade } from './connect.facade';
import { RechargeHistoryDto } from './dtos/recharge-history.dto';
import {
  UserConnectDurationDto,
  UserConnectRequestDto,
} from './dtos/user-connect-duration.dto';
import { UserRequestDto } from './dtos/user-request.dto';

@ApiTags('Connect')
@Controller('connects')
export class ConnectController {
  constructor(private readonly connectFacade: ConnectFacade) {}

  @Post('recharge')
  async createRechargeHistory(@Body() rechargeHistoryDto: RechargeHistoryDto) {
    const rechargeObj = await this.connectFacade.createRechargeHistory(
      rechargeHistoryDto,
    );
    return { data: rechargeObj, message: 'Recharge successful!!!' };
  }

  @Get('recharge/:userBasicId')
  async getRechargeHistory(@Param('userBasicId') userBasicId: string) {
    const rechargeHistory = await this.connectFacade.getRechargeHistory(
      userBasicId,
    );
    let result = {
      data: rechargeHistory,
      message: 'Recharge history fetched successfully!',
    };
    return result;
  }

  @Get('all_recharge')
  async getAllRecharge() {
    const rechargeHistory = await this.connectFacade.getAllRechargeHistory();
    return {
      data: rechargeHistory,
      message: 'Recharge history fetched successfully!',
    };
  }

  @Get('user_connect/:userBasicId')
  async getUserConnect(@Param('userBasicId') userBasicId: string) {
    const rechargeHistory = await this.connectFacade.getUserConnect(
      userBasicId,
    );
    return {
      data: rechargeHistory,
      message: 'User connect fetched successfully!',
    };
  }

  @Post('user_request')
  async createOrUpdateUserRequest(@Body() userRequestDto: UserRequestDto) {
    const userReqObj = await this.connectFacade.createOrUpdateUserRequest(
      userRequestDto,
    );
    return { data: userReqObj, message: 'Operation successfully completed.' };
  }

  @Get('user_request/:userBasicId')
  async getUserRequestDetails(@Param('userBasicId') userBasicId: string) {
    const userRequestDetails = await this.connectFacade.getUserRequestDetails(
      userBasicId,
    );
    return {
      data: userRequestDetails,
      message: 'Operation successfully completed.',
    };
  }

  @Post('user_connect_request')
  async createOrUpdateUserConnectRequest(
    @Body() userConnectRequestDto: UserConnectRequestDto,
  ) {
    const resp = await this.connectFacade.createOrUpdateUserConnectRequest(
      userConnectRequestDto,
    );
    return { data: resp, message: 'Operation successfully completed.' };
  }

  @Post('user_connect_duration')
  async createOrUpdateUserConnectDuration(
    @Body() userConnectDurationDto: UserConnectDurationDto,
  ) {
    const resp = await this.connectFacade.createOrUpdateUserConnectDuration(
      userConnectDurationDto,
    );
    return { data: resp, message: 'Operation successfully completed.' };
  }

  @ApiQuery({ name: 'userOneBasicId', required: false })
  @ApiQuery({ name: 'userTwoBasicId', required: false })
  @Get('user_connect_duration')
  async getUserConnectDuration(
    @Query('userOneBasicId') userOneBasicId: string,
    @Query('userTwoBasicId') userTwoBasicId: string,
  ) {
    let userConnectDurationDto = {
      userOneBasicId,
      userTwoBasicId,
    };
    const resp = await this.connectFacade.getUserConnectDuration(
      userConnectDurationDto,
    );
    return { data: resp, message: 'Operation successfully completed.' };
  }

  // ###################################################Aruni############################
  @Get('user_allconnect/:userBasicId')
  async getUserallConnect(@Param('userBasicId') userBasicId: string) {
    const connectDurationHistory =
      await this.connectFacade.getAllUserConnectDuration(userBasicId);
    return {
      data: connectDurationHistory,
      message: 'User connect fetched successfully!',
    };
  }

  @Get('connect_transaction/:userBasicId')
  async getuserConnectTransactions(@Param('userBasicId') userBasicId: string) {
    const connectTransactions = await this.connectFacade.getConnectTransaction(
      userBasicId,
    );
    return {
      data: connectTransactions,
      message: 'Transactions fetched successfully!',
    };
  }
  @Get('all_connect_transaction')
  async getalluserConnectTransactions() {
    console.log('getalluserConnectTransactions');
    const connectTransactions =
      await this.connectFacade.getalluserConnectTransactions();
    return {
      data: connectTransactions,
      message: 'Transactions  fetched successfully!',
    };
  }
}
