import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { MasterModule } from '../master/master.module';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserModule } from '../user/user.module';
import { ConnectController } from './connect.controller';
import { ConnectFacade } from './connect.facade';
import { ConnectRepo } from './connect.repo';
import { ConnectService } from './connect.service';
import { ConnectTransactionEntity } from './entities/connect-transaction-entity';
import { RechargeHistory } from './entities/recharge-history.entity';
import { UserConnectDurationLog } from './entities/user-connect-duration-log';
import { UserConnectDuration } from './entities/user-connect-duration.entity';
import { UserConnectLog } from './entities/user-connect-log.entity';
import { UserConnect } from './entities/user-connect.entity';
import { UserRequest } from './entities/user-request.entity';

@Module({
  imports: [
    forwardRef(() => MasterModule),
    forwardRef(() => SharedModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      UserBasic,
      UserConnect,
      UserConnectLog,
      UserRequest,
      RechargeHistory,
      UserConnectDurationLog,
      UserConnectDuration,
      ConnectTransactionEntity,
    ]),
  ],
  controllers: [ConnectController],
  providers: [ConnectService, ConnectFacade, ConnectRepo],
  exports: [ConnectService, ConnectRepo],
})
export class ConnectModule {}
