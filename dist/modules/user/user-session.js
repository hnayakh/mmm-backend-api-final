"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const moment = require("moment");
class UserSession {
    constructor(userName) {
        this.DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
        this.userName = userName;
        this.lastConnectedTime = moment(new Date()).format(this.DATE_TIME_FORMAT);
    }
    IsConnected() {
        const duration = moment.duration(moment(new Date()).diff(moment(this.lastConnectedTime, this.DATE_TIME_FORMAT)));
        console.log('durantion', duration.asSeconds());
        return duration.asSeconds() < 60;
    }
}
exports.UserSession = UserSession;
//# sourceMappingURL=user-session.js.map