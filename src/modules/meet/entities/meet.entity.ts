import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('meets')
export class Meet extends AbstarctEntity {
  @Column()
  status: UserMeetStatus;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  requestedId: string;

  @Column()
  requestingId: string;

  @Column()
  link: string;

  @Column()
  scheduleTime: string;

  @Column()
  address: string;

  static createMeet(
    lat: number,
    status: UserMeetStatus,
    long: number,
    requestedId: string,
    requestingId: string,
    link: string,
    scheduleTime: string,
    address: string,
  ) {
    const meetObj = new Meet();
    meetObj.status = status;
    meetObj.scheduleTime = scheduleTime;
    meetObj.requestedId = requestedId;
    meetObj.requestingId = requestingId;
    meetObj.address = address;
    meetObj.link = link;
    meetObj.lat = lat;
    meetObj.long = long;
    return meetObj;
  }

  updateMeet(
    lat: number,
    status: UserMeetStatus,
    long: number,
    requestedId: string,
    requestingId: string,
    link: string,
    scheduleTime: string,
    address: string,
  ) {
    this.status = status;
    this.scheduleTime = scheduleTime;
    this.requestedId = requestedId;
    this.requestingId = requestingId;
    this.address = address;
    this.link = link;
    this.lat = lat;
    this.long = long;
    return this;
  }
}
