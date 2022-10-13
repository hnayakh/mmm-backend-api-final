import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { Connect } from './modules/master/entities/connect.entity';
import { Coupon } from './modules/master/entities/coupon.entity';
import { Referral } from './modules/master/entities/referral.entity';
import { ConnectModule } from './modules/connect/connect.module';
import { RechargeHistory } from './modules/connect/entities/recharge-history.entity';
import { UserConnectLog } from './modules/connect/entities/user-connect-log.entity';
import { UserConnect } from './modules/connect/entities/user-connect.entity';
import { UserRequest } from './modules/connect/entities/user-request.entity';
import { MasterModule } from './modules/master/master.module';
import { AdminUser } from './modules/user/entities/admin-user.entity';
import { Otp } from './modules/user/entities/otp.entity';
import { UserAbout } from './modules/user/entities/user-about.entity';
import { UserBasic } from './modules/user/entities/user-basic.entity';
import { UserBio } from './modules/user/entities/user-bio.entity';
import { UserCareer } from './modules/user/entities/user-career.entity';
import { UserFamilyBackground } from './modules/user/entities/user-family-background.entity';
import { UserFamilyDetail } from './modules/user/entities/user-family-detail.entity';
import { UserHabit } from './modules/user/entities/user-habit.entity';
import { UserImage } from './modules/user/entities/user-image.entity';
import { UserLogin } from './modules/user/entities/user-login.entity';
import { UserPreference } from './modules/user/entities/user-preference.entity';
import { UserReligion } from './modules/user/entities/user-religion.entity';
import { UserModule } from './modules/user/user.module';
import { UserConnectDurationLog } from './modules/connect/entities/user-connect-duration-log';
import { UserConnectDuration } from './modules/connect/entities/user-connect-duration.entity';
import { ProfileVisit } from './modules/user/entities/user.profile.visit';
import { ConnectTransactionEntity } from './modules/connect/entities/connect-transaction-entity';
import { CmsModule } from './modules/cms/cms.module';
import { faq } from './modules/cms/entities/faq.entity';
import { AppGateway } from './app.gateway';
@Module({
  imports: [
    Logger,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      type: 'mysql',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserBasic,
        UserAbout,
        UserHabit,
        UserReligion,
        UserCareer,
        UserFamilyBackground,
        UserFamilyDetail,
        UserBio,
        UserImage,
        AdminUser,
        Otp,
        UserLogin,
        UserPreference,
        Connect,
        Referral,
        Coupon,
        UserConnect,
        UserConnectLog,
        UserRequest,
        RechargeHistory,
        faq,
        UserConnectDurationLog,
        UserConnectDuration,
        ConnectTransactionEntity,
        ProfileVisit
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MasterModule,
    ConnectModule,
    CmsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppGateway,
  ],
})
export class AppModule { }
