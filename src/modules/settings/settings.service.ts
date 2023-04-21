import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { SettingsRepo } from './settings.repo';
import { UserService } from '../user/user.service';

@Injectable()
export class SettingsService {
  constructor(
    private readonly meetRepo: SettingsRepo,
    private readonly userService: UserService,
    @InjectRepository(Settings)
    private readonly meet: Repository<Settings>,
  ) {}

  async createMeet(settingObj) {
    const meetData = Settings.createMeet(
      settingObj.status,
      settingObj.showPhone,
      settingObj.showEmail,
      settingObj.isHidden,
      settingObj.isNotification,
      settingObj.userBasicId,
    );
    return await this.meet.save(meetData);
  }

  async updateMeet(meetId, settingObj) {
    let meetResult = await this.meet.findOne({ userBasicId: meetId });
    meetResult.updateMeet(
      settingObj.status,
      settingObj.showPhone,
      settingObj.showEmail,
      settingObj.isHidden,
      settingObj.isNotification,
      settingObj.userBasicId,
    );
    return await this.meet.save(meetResult);
  }
  async getMeet(userBasicId: string) {
    return await this.meet.findOne({ userBasicId: userBasicId });
  }
}
