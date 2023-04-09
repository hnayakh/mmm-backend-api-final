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
      const activeSent = await this.meetRepo.getActiveSentRequest(userBasicId);
      const activeInvites = await this.meetRepo.getActiveInvites(userBasicId);
      const activeconnections = await this.meetRepo.getActiveConnections(
        userBasicId,
      );
      const activeSentconnections =
        await this.meetRepo.getActiveSentConnections(userBasicId);
      console.log('activeconnections', activeSentconnections);
      console.log('activeSent', activeSent);
      console.log('activeInvites', activeInvites);

      let requiredConnection = [...activeconnections, ...activeSentconnections];
      console.log('requiredConnection', requiredConnection);
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
      activeSent.forEach((input) => {
        input['requestedUserDeatails'] = users.find(
          (x) => x.id == input['requestedId'],
        );
        input['user'] = users.find((x) => x.id == input['requestedId']);
        let tempObj = {
          isConnected: false,
          id: null,
        };
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
      });
      console.log('requiredConnection', requiredConnection);

      requiredConnection.forEach((input) => {
        let tempObj = {
          isConnected: false,
          id: null,
        };
        let requiredObj = {};
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
