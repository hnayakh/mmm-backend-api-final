import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from './entities/settings.entity';
import { Repository } from 'typeorm';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';
@Injectable()
export class SettingsRepo {
  constructor(
    @InjectRepository(Settings)
    private readonly meet: Repository<Settings>,
  ) {}
  async getMeetRequestByUserId(userBasicId: string) {
    return this.meet.find({
      where: [
        {
          requestedId: userBasicId,
          isActive: true,
        },
        {
          requestingId: userBasicId,
          isActive: true,
        },
      ],
    });
  }

  
  async getActiveSentRequest(userBasicId: string) {
    return await this.meet.find({
      where: {
        requestingId: userBasicId,
        status: UserMeetStatus.Pending,
      },
    });
  }

  async getActiveInvites(userBasicId: string) {
    return await this.meet.find({
      where: {
        requestedId: userBasicId,
        status: UserMeetStatus.Pending,
      },
    });
  }

  async getActiveConnections(userBasicId: string) {
    return await this.meet.find({
      where: {
        requestedId: userBasicId,
        status: UserMeetStatus.Accepted,
      },
    });
  }
  async getActiveSentConnections(userBasicId: string) {
    return await this.meet.find({
      where: {
        requestingId: userBasicId,
        status: UserMeetStatus.Accepted,
      },
    });
  }
}
