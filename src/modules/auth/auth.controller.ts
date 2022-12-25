import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateOtpDto, VerifyOtpDto } from './dtos/create-otp.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const result = await this.authService.validateUser(
      userLoginDto.email,
      userLoginDto.password,
      userLoginDto.fireBaseToken,
    );
    return { data: result, message: 'User logged in successfully.' };
  }

  @Post('sendOtp')
  async sendOtp(@Body() createOtpDto: CreateOtpDto) {
    const result = await this.authService.sendOtp(createOtpDto);
    return { data: result, message: 'Otp sent succssfully.' };
  }

  @Post('verifyOtp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, fireBaseToken: string) {
    const result = await this.authService.verifyOtp(
      verifyOtpDto,
      fireBaseToken,
    );
    return { data: result, message: 'Otp verified successfully.' };
  }

  @Post('admin/login')
  async adminLogin(@Body() userLoginDto: UserLoginDto) {
    const result = await this.authService.validateAdminUser(
      userLoginDto.email,
      userLoginDto.password,
    );
    return { data: result, message: 'User logged in successfully.' };
  }
  @Post('generateAGoraToken')
  async generateAGoraToken(@Body() data: any) {
    console.log('data', data);
    const result = await this.authService.generateAGoraToken(data);
    console.log(result)
    return { data: result, message: 'successfully.' };
  }
}
