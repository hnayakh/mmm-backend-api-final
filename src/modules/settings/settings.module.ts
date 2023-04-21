import { Module,forwardRef } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { Settings } from './entities/settings.entity';
import { SettingsFacade } from './settings.facade';
import { SettingsRepo } from './settings.repo';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
    TypeOrmModule.forFeature([Settings]),
  ],
  controllers: [SettingsController],
  providers: [SettingsFacade, SettingsService,SettingsRepo],
  exports: [SettingsService],
})
export class SettingsModule {}
