import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActivationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AxiosService } from 'src/shared/services/axios.service';
import { UserService } from '../user/user.service';
import { MeetService } from './meet.service';

@Injectable()
export class MeetFacade {
  constructor(private readonly meetService: MeetService) {}
  async createMeet(meetData) {
    return await this.meetService.createMeet(meetData);
  }
  async updateMeet(meetId, meetData) {
    return await this.meetService.updateMeet(meetId, meetData);
  }
  async getMeet(userBasicId: string) {
    return await this.meetService.getMeet(userBasicId);
  }
}
