import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from './entities/meet.entity';
import { MeetRepo } from './meet.repo';
import { UserService } from '../user/user.service';

@Injectable()
export class MeetService {
  constructor(
    private readonly meetRepo: MeetRepo,
    private readonly userService: UserService,
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
      meeObject.type,
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
      meetData.type,
    );
    return await this.meet.save(meetResult);
  }
  async getMeet(userBasicId: string) {
    try {
      let activeSent = await this.meetRepo.getActiveSentRequest(userBasicId);
      let activeInvites = await this.meetRepo.getActiveInvites(userBasicId);
      const activeconnections = await this.meetRepo.getActiveConnections(
        userBasicId,
      );
      const activeSentconnections =
        await this.meetRepo.getActiveSentConnections(userBasicId);
      let requiredConnection = [...activeconnections, ...activeSentconnections];
      let userBasicIds = [];
      // Get userBasicIds
      activeSent.forEach((input) => {
        userBasicIds.push(input.requestedId);
        userBasicIds.push(input.requestingId);
      });
      activeInvites.forEach((input) => {
        userBasicIds.push(input.requestedId);
        userBasicIds.push(input.requestingId);
      });
      requiredConnection.forEach((input) => {
        userBasicIds.push(input.requestedId);
        userBasicIds.push(input.requestingId);
      });

      const users = await this.userService.getUsersByIds(userBasicIds);
      const connectedUserForCall = await this.meetRepo.getMeetRequestByUserId(
        userBasicId,
      );
      const blockedUser = await this.userService.getBlockedUsersForAll(
        userBasicId,
      );
      const blockedUserWho = await this.userService.getBlockedUsersWhom(
        userBasicId,
      );
      activeSent.forEach((input) => {
        input['requestedUserDeatails'] = users.find(
          (x) => x.id == input['requestedId'],
        );
        input['user'] = users.find((x) => x.id == input['requestedId']);
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let blockObj = {
          isBlocked: false,
          id: '',
        };
        let isBlockedOne = blockedUserWho.find(
          (u) => u.block_whom == input['requestingId'],
        );
        let isBlockedTwo = blockedUser.find(
          (u) => u.block_who == input['requestingId'],
        );
        console.log('isBlockedOne', isBlockedOne);
        console.log('isBlockedTwo', isBlockedTwo);
        if (isBlockedOne != null || isBlockedOne != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedOne.id;
        }
        if (isBlockedTwo != null || isBlockedTwo != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedTwo.id;
        }
        // let isConnectOne = connectedUserForCall.find(
        //   (u) => u.requestedId == input['requestedId'],
        // );
        // if (isConnectOne != null) {
        //   (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
        // }
        // let isConnectTwo = connectedUserForCall.find(
        //   (u) => u.requestingId == input['requestedId'],
        // );
        // if (isConnectTwo != null) {
        //   (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
        // }
        // input['user']['meetStatus'] = tempObj;
        // input['requestingUserDeatails'] = users.find(
        //   (x) => x.id == input['requestingId'],
        // );
      });

      activeInvites.forEach((input) => {
        input['requestedUserDeatails'] = users.find(
          (x) => x.id == input['requestedId'],
        );
        input['user'] = users.find((x) => x.id == input['requestingId']);
        // let tempObj = {
        //   isConnected: false,
        //   id: null,
        // };
        // let isConnectOne = connectedUserForCall.find(
        //   (u) => u.requestedId == input['requestingId'],
        // );
        // if (isConnectOne != null) {
        //   (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
        // }
        // let isConnectTwo = connectedUserForCall.find(
        //   (u) => u.requestingId == input['requestingId'],
        // );
        // if (isConnectTwo != null) {
        //   (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
        // }
        // input['user']['connectStatus'] = tempObj;
        let blockObj = {
          isBlocked: false,
          id: '',
        };
        let isBlockedOne = blockedUserWho.find(
          (u) => u.block_whom == input['requestingId'],
        );
        let isBlockedTwo = blockedUser.find(
          (u) => u.block_who == input['requestingId'],
        );
        console.log('isBlockedOne', isBlockedOne);
        console.log('isBlockedTwo', isBlockedTwo);
        if (isBlockedOne != null || isBlockedOne != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedOne.id;
        }
        if (isBlockedTwo != null || isBlockedTwo != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedTwo.id;
        }
      });
      console.log('requiredConnection', requiredConnection);

      requiredConnection.forEach((input) => {
        let tempObj = {
          isConnected: false,
          id: null,
        };

        let requiredObj = {};
        let blockObj = {
          isBlocked: false,
          id: '',
        };
        let isBlockedOne = blockedUserWho.find(
          (u) => u.block_whom == input['requestingId'],
        );
        let isBlockedTwo = blockedUser.find(
          (u) => u.block_who == input['requestingId'],
        );
        console.log('isBlockedOne', isBlockedOne);
        console.log('isBlockedTwo', isBlockedTwo);
        if (isBlockedOne != null || isBlockedOne != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedOne.id;
        }
        if (isBlockedTwo != null || isBlockedTwo != undefined) {
          blockObj.isBlocked = true;
          blockObj.id = isBlockedTwo.id;
        }
        if (userBasicId == input['requestedId']) {
          input['requestedUserDeatails'] = users.find(
            (x) => x.id == input['requestedId'],
          );
          input['user'] = users.find((x) => x.id == input['requestingId']);
          let isConnectOne = connectedUserForCall.find(
            (u) => u.requestedId == input['requestedId'],
          );
          console.log('connectedUserForCall', connectedUserForCall);
          console.log('isConnectOne', isConnectOne);
          if (isConnectOne != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            requiredObj = isConnectOne;
          }
        } else {
          input['requestedUserDeatails'] = users.find(
            (x) => x.id == input['requestingId'],
          );
          input['user'] = users.find((x) => x.id == input['requestedId']);
          let isConnectTwo = connectedUserForCall.find(
            (u) => u.requestingId == input['requestingId'],
          );
          console.log('isConnectTwo inside requiredConnection', isConnectTwo);
          if (isConnectTwo != null) {
            (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            requiredObj = isConnectTwo;
          }
        }
      });
      if (blockedUserWho.length > 0) {
        blockedUserWho.forEach((e) => {
          requiredConnection = requiredConnection.filter(
            (x: any) => x.requestingUserDeatails.id != e.block_who,
          );
          activeInvites = activeInvites.filter(
            (x: any) => x.user.id != e.block_who,
          );
          activeSent = activeSent.filter(
            (x: any) => x.user.id != e.block_who,
          );
        });
      }
      if (blockedUser.length > 0) {
        blockedUser.forEach((e) => {
          requiredConnection = requiredConnection.filter(
            (x: any) => x.requestingUserDeatails.id != e.block_who,
          );
          activeInvites = activeInvites.filter(
            (x: any) => x.user.id != e.block_who,
          );
          activeSent = activeSent.filter(
            (x: any) => x.user.id != e.block_who,
          );
        });
      }
      console.log('activeconactiveconnections', requiredConnection);
      return {
        activeSent,
        activeconnections: requiredConnection,
        activeInvites,
      };
    } catch (err) {
      console.log(err);
      return {};
    }
  }
}
