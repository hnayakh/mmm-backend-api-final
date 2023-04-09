import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MeetFacade } from './meet.facade';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meet')
@Controller('meet')
export class MeetController {
  constructor(private readonly meetFacade: MeetFacade) {}

  @Post('create')
  async createMeet(@Body() meetData: object) {
    const result = await this.meetFacade.createMeet(meetData);
    return { data: result, message: 'Meet created' };
  }
  @Post('update/:meetId')
  async updateMeet(@Param('meetId') meetId: number, @Body() meetData: object) {
    const result = await this.meetFacade.updateMeet(meetId, meetData);
    return { data: result, message: 'Meet updated' };
  }
  @Get('get/:userBasicId')
  async getMeet(@Param('userBasicId') userBasicId: string) {
    const result = await this.meetFacade.getMeet(userBasicId);
    return { data: result, message: 'Meet fetched' };
  }
}
