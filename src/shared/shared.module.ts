import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef, Logger, Module } from '@nestjs/common';
import { MasterModule } from 'src/modules/master/master.module';
import { UserModule } from 'src/modules/user/user.module';
import { AxiosService } from './services/axios.service';
import { ResponseService } from './services/response.service';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UserModule),
    forwardRef(() => MasterModule),
  ],
  providers: [ResponseService, S3Service, AxiosService, Logger],
  exports: [ResponseService, S3Service, AxiosService],
})
export class SharedModule {}
