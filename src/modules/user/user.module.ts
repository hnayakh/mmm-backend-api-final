import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ConnectModule } from '../connect/connect.module';
import { ConnectRepo } from '../connect/connect.repo';
import { ConnectService } from '../connect/connect.service';
import { ConnectTransactionEntity } from '../connect/entities/connect-transaction-entity';
import { RechargeHistory } from '../connect/entities/recharge-history.entity';
import { UserConnectDurationLog } from '../connect/entities/user-connect-duration-log';
import { UserConnectDuration } from '../connect/entities/user-connect-duration.entity';
import { UserConnectLog } from '../connect/entities/user-connect-log.entity';
import { UserConnect } from '../connect/entities/user-connect.entity';
import { UserRequest } from '../connect/entities/user-request.entity';
import { MasterModule } from '../master/master.module';
import { AdminUser } from './entities/admin-user.entity';
import { UserBlock } from './entities/block-user.entity';
import { Notification } from './entities/notification.entity';
import { Otp } from './entities/otp.entity';
import { UserAbout } from './entities/user-about.entity';
import { UserBasic } from './entities/user-basic.entity';
import { UserBio } from './entities/user-bio.entity';
import { UserCareer } from './entities/user-career.entity';
import { UserDocs } from './entities/user-docs.entity';
import { UserFamilyBackground } from './entities/user-family-background.entity';
import { UserFamilyDetail } from './entities/user-family-detail.entity';
import { UserHabit } from './entities/user-habit.entity';
import { UserHobbies } from './entities/user-hobbies.entity';
import { UserImage } from './entities/user-image.entity';
import { UserLifestyle } from './entities/user-lifestyle.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserReligion } from './entities/user-religion.entity';
import { ProfileVisit } from './entities/user.profile.visit';
import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserRepo } from './user.repo';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => MasterModule),
    forwardRef(() => SharedModule),
    forwardRef(() => ConnectModule),
    JwtModule.register({
      secret: 'MakeyMyMarry123####',
      signOptions: { expiresIn: '1800s' },
    }),
    TypeOrmModule.forFeature([
      UserBasic,
      UserAbout,
      UserHabit,
      UserReligion,
      UserCareer,
      UserFamilyBackground,
      UserFamilyDetail,
      UserBio,
      UserImage,
      UserDocs,
      AdminUser,
      Otp,
      UserLogin,
      UserPreference,
      UserRequest,
      UserBlock,
      UserConnect,
      UserConnectLog,
      RechargeHistory,
      UserConnectDurationLog,
      UserConnectDuration,
      ConnectTransactionEntity,
      ProfileVisit,
      Notification,
      UserLifestyle,
      UserHobbies,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserFacade,
    UserService,
    UserRepo,
    ConnectService,
    ConnectRepo,
    Notification,
  ],
  exports: [UserService],
})
export class UserModule {}
