import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SettingsFacade } from './settings.facade';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserSettings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly meetFacade: SettingsFacade) {}

  @Post('create')
  async createMeet(@Body() meetData: object) {
    const result = await this.meetFacade.createMeet(meetData);
    return { data: result, message: 'Settings created' };
  }
  @Post('update/:userBasicID')
  async updateMeet(@Param('userBasicID') meetId: number, @Body() meetData: object) {
    const result = await this.meetFacade.updateMeet(meetId, meetData);
    return { data: result, message: 'Settings updated' };
  }
  @Get('get/:userBasicId')
  async getMeet(@Param('userBasicId') userBasicId: string) {
    const result = await this.meetFacade.getMeet(userBasicId);
    return { data: result, message: 'Settings fetched' };
  }
}
