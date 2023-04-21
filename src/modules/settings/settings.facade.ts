import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActivationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AxiosService } from 'src/shared/services/axios.service';
import { UserService } from '../user/user.service';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsFacade {
  constructor(private readonly settingsService: SettingsService) {}
  async createMeet(meetData) {
    return await this.settingsService.createMeet(meetData);
  }
  async updateMeet(meetId, meetData) {
    return await this.settingsService.updateMeet(meetId, meetData);
  }
  async getMeet(userBasicId: string) {
    return await this.settingsService.getMeet(userBasicId);
  }
}
