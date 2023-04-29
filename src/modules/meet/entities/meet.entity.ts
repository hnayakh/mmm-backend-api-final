import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserMeetStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('meets')
export class Meet extends AbstarctEntity {
  @Column()
  status: UserMeetStatus;

  @Column({ type: 'double' })
  lat: number;

  @Column({ type: 'double' })
  long: number;

  @Column()
  type: string;

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
    status: UserMeetStatus,
    long: number,
    lat: number,
    requestedId: string,
    requestingId: string,
    link: string,
    scheduleTime: string,
    address: string,
    type: string,
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
    meetObj.type = type;
    return meetObj;
  }

  updateMeet(
    status: UserMeetStatus,
    long: number,
    lat: number,
    requestedId: string,
    requestingId: string,
    link: string,
    scheduleTime: string,
    address: string,
    type: string,
  ) {
    this.status = status;
    this.scheduleTime = scheduleTime;
    this.requestedId = requestedId;
    this.requestingId = requestingId;
    this.address = address;
    this.link = link;
    this.lat = lat;
    this.long = long;
    this.type = type;
    return this;
  }
}
