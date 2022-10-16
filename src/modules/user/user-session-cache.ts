import { Inject, CACHE_MANAGER, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Cache } from 'cache-manager';
import { UserSession } from './user-session';
import { UserRepo } from './user.repo';
import { getManager, Repository } from 'typeorm';
@Injectable()
export class UserSessionCache {
  sessions = null;
  key = 'activeUsers';
  DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  expired_time = 60 * 60 * 1000;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private userRepo: se,
  ) {
    this.sessions = [];
  }

  async addOrUpdate(userBasicId: string) {
    let allUserSessions = (await this.cacheManager.get(
      this.key,
    )) as UserSession[];
    let existingSession = allUserSessions?.find(
      (x) => x.userBasicId === userBasicId,
    );

    if (existingSession) {
      existingSession.lastConnectedTime = moment(new Date()).format(
        this.DATE_TIME_FORMAT,
      );
      await this.cacheManager.set(this.key, allUserSessions, {
        ttl: this.expired_time,
      });
    } else {
      this.addNewUserSession(userBasicId, allUserSessions);
    }
  }

  private async addNewUserSession(
    userBasicId: string,
    allUserSessions: UserSession[],
  ) {
    const allSessions = [
      ...(allUserSessions ?? []),
      new UserSession(userBasicId),
    ];
    await this.cacheManager.set(this.key, allSessions, {
      ttl: this.expired_time,
    });
  }

  async get(userBasicId: string) {
    const results = await this.cacheManager.get(this.key);
    return results
      ? (results as UserSession[]).find((x) => x.userBasicId === userBasicId)
      : null;
  }

  async getAllActiveUsers(userBasicId) {
    const results = (await this.cacheManager.get(this.key)) as UserSession[];
    let allOnlineMember = results?.filter((x) => x); //.IsConnected()
    let allMembersId = allOnlineMember.map((x) => x.userBasicId);
    const inClause = allMembersId.map((id) => "'" + id + "'").join();
    let tempQuery = `SELECT ul.userBasicId,uv.* 
    FROM user_logins ul 
    join users_view uv 
    where userBasicId in (${inClause}) 
    group by userBasicId;`;
    const entityManager = getManager();
    const users = await entityManager.query(tempQuery);
    return users;
  }

  async getMyOnlineUSers(userBasicId) {
    const results = (await this.cacheManager.get(this.key)) as UserSession[];
    console.log('all data', results);
    let allOnlineMember = results?.filter((x) => x.userBasicId); //.IsConnected()
    let allMembersId = allOnlineMember.map((x) => x.userBasicId);
  
    const inClause = allMembersId.map((id) => "'" + id + "'").join();
    let tempQuery = `SELECT ul.userBasicId,uva.* FROM user_logins as ul  join users_view_admin uva on ul.userBasicId=uva.id
    where userBasicId in (${inClause}) and ul.userBasicId !='${userBasicId}' group by userBasicId;`;
    console.log(tempQuery)
    const entityManager = getManager();
    const users = await entityManager.query(tempQuery);
    console.log('users', users);
    return users;
  }

  async getUserOnlineStatus(userBasicId) {
    let isOnline = false;
    const results = (await this.cacheManager.get(this.key)) as UserSession[];
    let allOnlineMember = results?.filter((x) => x.IsConnected());
    if (allOnlineMember.filter((x) => x.userBasicId).length > 0) {
      isOnline = true;
    }
    return { userBasicId: userBasicId, isOnline: isOnline };
  }

  async remove(userBasicId: string) {
    const results = await this.cacheManager.get(this.key);
    if (results) {
      const updatedSessions = (results as UserSession[]).filter(
        (x) => x.userBasicId !== userBasicId,
      );
      await this.cacheManager.set(this.key, updatedSessions, {
        ttl: this.expired_time,
      });
    }
  }
}
