import * as moment from 'moment';

export class UserSession {
  private DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  userBasicId: string;
  lastConnectedTime: string;

  constructor(userBasicId: string) {
    this.userBasicId = userBasicId;
    this.lastConnectedTime = moment(new Date()).format(this.DATE_TIME_FORMAT);
  }

  IsConnected() {
    const duration = moment.duration(
      moment(new Date()).diff(
        moment(this.lastConnectedTime, this.DATE_TIME_FORMAT),
      ),
    );
    console.log('durantion', duration.asSeconds());
    return duration.asSeconds() < 2;
  }
}
