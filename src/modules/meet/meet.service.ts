import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from './entities/meet.entity';

@Injectable()
export class MeetService {
  constructor(
    @InjectRepository(Meet)
    private readonly meet: Repository<Meet>,
  ) {}

  async createMeet(meeObject) {
    const meetData = Meet.createMeet(
      meeObject.lat,
      meeObject.status,
      meeObject.long,
      meeObject.requestedId,
      meeObject.requestingId,
      meeObject.link,
      meeObject.scheduleTime,
      meeObject.address,
    );
    return await this.meet.save(meetData);
  }

  async updateMeet(meetId, meetData) {
    let meetResult = await this.meet.findOne({ id: meetId });
    meetResult.updateMeet(
      meetData.lat,
      meetData.status,
      meetData.long,
      meetData.requestedId,
      meetData.requestingId,
      meetData.link,
      meetData.scheduleTime,
      meetData.address,
    );
    return await this.meet.save(meetResult);
  }
  async getMeet(){

  }
}
