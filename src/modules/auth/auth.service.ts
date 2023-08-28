import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OtpType } from 'src/shared/enums/miscellaneous.enum';
import { AdminUser } from '../user/entities/admin-user.entity';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserService } from '../user/user.service';
import { CreateOtpDto, VerifyOtpDto } from './dtos/create-otp.dto';
import { AxiosService } from 'src/shared/services/axios.service';
const sdk = require('api')('@msg91api/v5.0#6n91xmlhu4pcnz');

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private axiosService: AxiosService,
  ) { }

  async sendVerificationEmail(email: string, userId: string) {
    try {
      if(!email){
        throw new HttpException(
          'Please Provide Email',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      const payload = { username: email, sub: userId };
      let emailVerifyToken = this.jwtService.sign(payload);
      this.axiosService.post('https://control.msg91.com/api/v5/email/send', {
        "recipients": [
          {
            "to": [
              {
                "email": email
              }
            ],
            "variables": {
              "user": "",
              "link": `http://15.206.67.212:3000/api/auth/verify_email?token=${emailVerifyToken}`
            }
          }
        ],
        "from": {
          "email": "info@makemymarry.com"
        },
         "domain": "mail.makemymarry.com",
        "template_id": "Test2"
      },
        { "authkey": '376173AfLKCeOLqx2f626781e0P1' })
        .then(({ data }) => console.log(data))
        .catch((err: any) => {
          console.error(err.message);
        });
    } catch (e) {
      throw e;
    }
  }

  async verifyEmail(token: string) {
    try{
      var decodedToken = this.jwtService.verify(token);
      const user = await this.userService.markEmailVerified(
        decodedToken.username, decodedToken.sub
      );
    }catch(e){
      throw(e)
    }
  }
  async validateUser(
    email: string,
    loginPassword: string,
    fireBaseToken: string,
  ): Promise<any> {
    const user = await this.userService.getUserBasicByEmail(
      email.toLowerCase(),
    );

    if (user == null || user == undefined) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.isActive) {
      throw new HttpException(
        'User is blocked. Please contact admin.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const match = await bcrypt.compare(loginPassword, user.password);
    if (!match) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const requiredLoginDetails = await this.userService.getRequiredLoginDetails(
      user.id,
    );
    return await this.login(user, requiredLoginDetails, fireBaseToken);
  }

  async validateSocialUser(
    email: string,
    providerId: string,
    socialAccessToken: string,
    fireBaseToken: string
  ): Promise<any> {
    const user = await this.userService.getUserBasicByEmail(
      email.toLowerCase(),
    );

    if (user == null || user == undefined) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.isActive) {
      throw new HttpException(
        'User is blocked. Please contact admin.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const requiredLoginDetails = await this.userService.getRequiredLoginDetails(
      user.id,
    );
    return await this.login(user, requiredLoginDetails, fireBaseToken);
  }

  private async login(
    user: UserBasic,
    requiredLoginDetails: any,
    fireBaseToken: any,
  ) {
    const payload = { username: user.email, sub: user.id };
    let authToken = this.jwtService.sign(payload);
    this.userService.createUserLogin('M', '12e34', authToken, user);
    this.userService.updateTokenToUserBasic(fireBaseToken, user.id);
    return {
      userId: user.id,
      access_token: authToken,
      userBasic: user,
      requiredLoginDetails,
    };
  }

  async decodeToken(authToken: string) {
    const token = authToken.replace('Bearer ', '');
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
  }

  // This is to compare passwords at the time of change password.
  async comparePassword(oldPassword: string, userPassword: string) {
    const match = await bcrypt.compare(oldPassword, userPassword);
    if (!match) {
      throw new HttpException(
        'Password does not match.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async sendOtp(createOtpDto: CreateOtpDto) {
    const otp = '123456'; //Math.floor(100000 + Math.random() * 900000).toString();
    if (createOtpDto.type == OtpType.Registration) {
      const userBasicByEmail = await this.userService.getUserBasicByEmail(
        createOtpDto.email,
      );
      if (userBasicByEmail) {
        throw new HttpException(
          'Email already registered.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      const userBasicByPhone = await this.userService.getUserBasicByPhone(
        createOtpDto.phoneNumber,
      );
      if (userBasicByPhone) {
        throw new HttpException(
          'Phone number is already registered.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      await this.userService.createOtp(
        createOtpDto.email,
        createOtpDto.phoneNumber,
        otp,
      );
      return {
        otp: otp,
        phoneNumber: createOtpDto.phoneNumber,
        email: createOtpDto.email,
      };
    } else if (createOtpDto.type == OtpType.Login) {
      const userBasicByPhone = await this.userService.getUserBasicByPhone(
        createOtpDto.phoneNumber,
      );
      if (!userBasicByPhone) {
        throw new HttpException(
          'Kindly register before logging in.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      await this.userService.createOtp(
        createOtpDto.email,
        createOtpDto.phoneNumber,
        otp,
      );
      return {
        otp: otp,
        phoneNumber: createOtpDto.phoneNumber,
        email: createOtpDto.email,
      };
    } else {
      const userBasicByEmail = await this.userService.getUserBasicByEmail(
        createOtpDto.email,
      );
      if (!userBasicByEmail) {
        throw new HttpException(
          'Kindly register before logging in.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      await this.userService.createOtp(
        createOtpDto.email,
        createOtpDto.phoneNumber,
        otp,
      );
      return {
        otp: otp,
        phoneNumber: createOtpDto.phoneNumber,
        email: createOtpDto.email,
      };
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, fireBaseToken) {
    if (verifyOtpDto.type == OtpType.Registration) {
      const sentOtp = await this.userService.getOtpForVerification(
        verifyOtpDto.phoneNumber,
        null,
      );
      if (!sentOtp) {
        throw new HttpException('Try again.', HttpStatus.EXPECTATION_FAILED);
      }
      if (
        sentOtp.otp != verifyOtpDto.otp ||
        new Date() > new Date(sentOtp.validTill)
      ) {
        throw new HttpException(
          'Invalid OTP. Try again.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      this.userService.updateOtpStatus(
        verifyOtpDto.phoneNumber,
        verifyOtpDto.email,
        verifyOtpDto.otp,
      );
      return {
        userId: null,
        access_token: null,
        userBasic: null,
      };
    } else if (verifyOtpDto.type == OtpType.Login) {
      const sentOtp = await this.userService.getOtpForVerification(
        verifyOtpDto.phoneNumber,
        null,
      );
      if (!sentOtp) {
        throw new HttpException('Try again.', HttpStatus.EXPECTATION_FAILED);
      }
      if (
        sentOtp.otp != verifyOtpDto.otp ||
        new Date() > new Date(sentOtp.validTill)
      ) {
        throw new HttpException(
          'Invalid OTP. Try again.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      const userBasic = await this.userService.getUserBasicByPhone(
        verifyOtpDto.phoneNumber,
      );
      this.userService.updateOtpStatus(
        verifyOtpDto.phoneNumber,
        verifyOtpDto.email,
        verifyOtpDto.otp,
      );
      const requiredLoginDetails =
        await this.userService.getRequiredLoginDetails(userBasic.id);
      return this.login(userBasic, requiredLoginDetails, fireBaseToken);
    } else {
      const sentOtp = await this.userService.getOtpForVerification(
        null,
        verifyOtpDto.email,
      );
      if (!sentOtp) {
        throw new HttpException('Try again.', HttpStatus.EXPECTATION_FAILED);
      }
      if (
        sentOtp.otp != verifyOtpDto.otp ||
        new Date() > new Date(sentOtp.validTill)
      ) {
        throw new HttpException(
          'Invalid OTP. Try again.',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      const userBasic = await this.userService.getUserBasicByEmail(
        verifyOtpDto.email,
      );
      this.userService.updateOtpStatus(
        verifyOtpDto.phoneNumber,
        verifyOtpDto.email,
        verifyOtpDto.otp,
      );
      const requiredLoginDetails =
        await this.userService.getRequiredLoginDetails(userBasic.id);
      return this.login(userBasic, requiredLoginDetails, fireBaseToken);
    }
  }

  async validateAdminUser(email: string, loginPassword: string): Promise<any> {
    const adminUser = await this.userService.getAdminUserByEmail(
      email.toLowerCase(),
    );

    if (adminUser == null || adminUser == undefined) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!adminUser.isActive) {
      throw new HttpException(
        'User is blocked. Please contact admin.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const match = await bcrypt.compare(loginPassword, adminUser.password);
    if (!match) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return await this.adminLogin(adminUser);
  }

  private async adminLogin(adminUser: AdminUser) {
    const payload = {
      username: adminUser.email,
      sub: adminUser.id,
      role: adminUser.role,
    };
    let authToken = this.jwtService.sign(payload);
    return {
      userId: adminUser.id,
      access_token: authToken,
      adminUser: adminUser,
    };
  }

  async generateAGoraToken(data: any) {
    return await this.userService.generateAGoraToken(data);
  }
}
