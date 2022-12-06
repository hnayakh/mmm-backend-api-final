import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Console } from 'console';
import { ResponseService } from 'src/shared/services/response.service';
import { CreateUserReligionDto } from './dtos/craete-user-religion.dto';
import { CreateAdminUserDto } from './dtos/create-admin-user.dto';
import { CreateUserAboutDto } from './dtos/create-user-about.dto';
import { CreateUserBasicDto } from './dtos/create-user-basic.dto';
import { CreateUserBioImageDto, UpdateUserDocsDto } from './dtos/create-user-bio-image.dto';
import { CreateUserCareerDto } from './dtos/create-user-career.dto';
import { CreateUserFamilyBgDto } from './dtos/create-user-familybg.dto';
import { CreateUserFamilyDDto } from './dtos/create-user-familyd.dto';
import { CreateUserHabitDto } from './dtos/create-user-habit.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { AdminUser } from './entities/admin-user.entity';
import { UserFacade } from './user.facade';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'isVerified', required: false })
  @Get()
  async getAllUsers(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('isVerified') isVerified: string,
  ) {
    const users = await this.userFacade.getAllUsers(skip, take, isVerified);
    return { data: users, message: 'All users fetched successfully.' };
  }

  @Post('basic')
  async createUserBasic(@Body() createUserBasicDto: CreateUserBasicDto) {
    const userBasic = await this.userFacade.createUserBasic(createUserBasicDto);
    return { data: userBasic, message: 'User basic registration successful.' };
  }

  @Get('basic/:userBasicId')
  async getUserDeatailById(@Param('userBasicId') userBasicId: string) {
    const userBasic = await this.userFacade.getUserDeatailById(userBasicId);
    return {
      data: userBasic,
      message: 'User basic details fetched successful.',
    };
  }
  @Get('displaybasic/:displayId')
  async getUserDeatailByDisplayId(@Param('displayId') displayId: string) {
    console.log("DISPLAY", displayId);
    let message='User basic details fetched successful.';
    
    const userBasic = await this.userFacade.getUserDeatailByDisplayId(displayId);
   
    if(!userBasic){
      message="No user found for given DisplayId";
      
    }
    return {
      data: userBasic?userBasic:{},
      message: message,
    };
  }

  @Post('about')
  async createUserAbout(@Body() createUserAboutDto: CreateUserAboutDto) {
    const userAbout = await this.userFacade.createUserAbout(createUserAboutDto);
    return { data: userAbout, message: 'User about registration successful.' };
  }

  @Post('habit')
  async createUserHabit(@Body() createUserHabitDto: CreateUserHabitDto) {
    const userHabit = await this.userFacade.createUserHabit(createUserHabitDto);
    return { data: userHabit, message: 'User habit registration successful.' };
  }

  @Post('religion')
  async createUserReligion(
    @Body() createUserReligionDto: CreateUserReligionDto,
  ) {
    const userReligion = await this.userFacade.createUserReligion(
      createUserReligionDto,
    );
    return {
      data: userReligion,
      message: 'User habit registration successful.',
    };
  }

  @Post('career')
  async createUserCareer(@Body() createUserCareerDto: CreateUserCareerDto) {
    const userCareer = await this.userFacade.createUserCareer(
      createUserCareerDto,
    );
    return {
      data: userCareer,
      message: 'User career registration successful.',
    };
  }

  @Post('preference')
  async createUserPreference(
    @Body() createUserPreferenceDto: CreateUserPreferenceDto,
  ) {
    const userPreference = await this.userFacade.createUserPreference(
      createUserPreferenceDto,
    );
    return {
      data: userPreference,
      message: 'User preference created successfully.',
    };
  }

  @Post('familyBackground')
  async createUserFamilyBackground(
    @Body() createUserFamilyBgDto: CreateUserFamilyBgDto,
  ) {
    const userFamilyBg = await this.userFacade.createUserFamilyBackground(
      createUserFamilyBgDto,
    );
    return {
      data: userFamilyBg,
      message: 'User family background registration successful.',
    };
  }

  @Post('familyDetail')
  async createUserFamilyDetail(
    @Body() createUserFamilyDDto: CreateUserFamilyDDto,
  ) {
    const userFamilyDetail = await this.userFacade.createUserFamilyDetail(
      createUserFamilyDDto,
    );
    return {
      data: userFamilyDetail,
      message: 'User family detail registration successful.',
    };
  }

  @Post('images/:userId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadUserImages(
    @Param('userId') userId: string,
    @UploadedFiles() files: any,
    @Body() idProof: string,
  ) {
    const imageUrls = await this.userFacade.uploadUserImages(userId, files);
    return { data: imageUrls, message: 'User image uploaded successfully.' };
  }

  @Post('docsImages/:userId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadDocImages(
    @Param('userId') userId: string,
    @UploadedFiles() files: any,
  
  ) {
    const imageUrls = await this.userFacade.uploadUserDocImages(userId, files);
    return { data: imageUrls, message: 'User Doc Image uploaded successfully.'};
  }

  @Post('bio')
  async createUserBioWithImages(
    @Body() createUserBioImageDto: CreateUserBioImageDto,
  ) {
    const result = await this.userFacade.createUserBioWithImages(
      createUserBioImageDto,
    );
    return { data: result, message: 'User profile registration successful.' };
  }
  
  @Post('docs')
  async updateUserBioWithDocs(
    @Body() UpdateUserDocsDto: UpdateUserDocsDto,
  ) {
    const result = await this.userFacade.updateUserBioWithDocs(
      UpdateUserDocsDto,
    );
    return { data: result, message: 'User profile registration successful.' };
  }

  @Get('admin/verify/:userBasicId')
  async verifyUserByAdmin(@Param('userBasicId') userBasicId: string) {
    const result = await this.userFacade.verifyUserByAdmin(userBasicId);
    return { data: null, message: 'User profile verified successful.' };
  }

  @Get('admin/rejct/:userBasicId')
  async rejectUserByAdmin(@Param('userBasicId') userBasicId: string) {
    const result = await this.userFacade.rejectUserByAdmin(userBasicId);
    return { data: null, message: 'User profile rejected.' };
  }

  @ApiQuery({ name: 'age', required: false })
  @ApiQuery({ name: 'height', required: false })
  @ApiQuery({ name: 'maritalStatus', required: false })
  @ApiQuery({ name: 'abilityStatus', required: false })
  @ApiQuery({ name: 'religion', required: false })
  @ApiQuery({ name: 'cast', required: false })
  @ApiQuery({ name: 'gothra', required: false })
  @ApiQuery({ name: 'motherTongue', required: false })
  @ApiQuery({ name: 'isManglik', required: false })
  @ApiQuery({ name: 'employedIn', required: false })
  @ApiQuery({ name: 'occupation', required: false })
  @ApiQuery({ name: 'highestEducation', required: false })
  @ApiQuery({ name: 'annualIncome', required: false })
  @ApiQuery({ name: 'food', required: false })
  @ApiQuery({ name: 'smoke', required: false })
  @ApiQuery({ name: 'drink', required: false })
  @ApiQuery({ name: 'interests', required: false })
  @Get('profiles/:userBasicId')
  async getProfilesByPreference(
    @Param('userBasicId') userBasicId: string,
    @Query('age') age: string,
    @Query('height') height: string,
    @Query('maritalStatus') maritalStatus: string,
    @Query('abilityStatus') abilityStatus: string,
    @Query('religion') religion: string,
    @Query('cast') cast: string,
    @Query('gothra') gothra: string,
    @Query('motherTongue') motherTongue: string,
    @Query('isManglik') isManglik: string,
    @Query('employedIn') employedIn: string,
    @Query('occupation') occupation: string,
    @Query('highestEducation') highestEducation: string,
    @Query('annualIncome') annualIncome: string,
    @Query('food') food: string,
    @Query('smoke') smoke: string,
    @Query('drink') drink: string,
    @Query('interests') interests: string,
  ) {
    let queryObj = {
      age,
      height,
      maritalStatus,
      abilityStatus,
      religion,
      cast,
      gothra,
      motherTongue,
      isManglik,
      employedIn,
      occupation,
      highestEducation,
      annualIncome,
      food,
      smoke,
      drink,
      interests,
    };
    const result = await this.userFacade.getProfilesByPreference(
      userBasicId,
      queryObj,
    );
    return { data: result, message: 'Preferred profiles fetched.' };
  }

  @ApiQuery({ name: 'fileKey', required: true })
  @ApiQuery({ name: 'contentType', required: true })
  @Get('presignedUrl/:userBasicId')
  async getPresignedUrl(
    @Param('userBasicId') userBasicId: string,
    @Query('fileKey') fileKey: string,
    @Query('contentType') contentType: string,
  ) {
    const result = await this.userFacade.getPresignedUrl(
      userBasicId,
      fileKey,
      contentType,
    );
    return { data: result, message: 'Presigned url generated successfully.' };
  }

  @Post('admin')
  async createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto) {
    const adminUser = await this.userFacade.createAdminUser(createAdminUserDto);
    return { data: adminUser, message: 'Admin registration successful.' };
  }
  @Put('admin')
  async updateAdminUser(@Body() createAdminUserDto: AdminUser) {
    const adminUser = await this.userFacade.updateAdminUser(createAdminUserDto);
    return { data: adminUser, message: 'Admin registration successful.' };
  }

  @Get('admin')
  async getAdminUsers() {
    const adminUsers = await this.userFacade.getAdminUsers();
    return { data: adminUsers, message: 'Admin registration successful.' };
  }

  @ApiQuery({ name: 'email', required: true })
  @Get('validate/email')
  async validateEmail(@Query('email') email: string) {
    const response = await this.userFacade.validateEmail(email);
    return {
      data: response,
      message: response.isEmailAvailable ? 'Proceed' : 'Email already exist.',
    };
  }

  @ApiQuery({ name: 'otherUserBasicId', required: true })
  @Get('match_percentage/:userBasicId')
  async getMatchPercentage(
    @Query('otherUserBasicId') otherUserBasicId: string,
    @Param('userBasicId') userBasicId: string,
  ) {
    const response = await this.userFacade.getMatchPercentage(userBasicId,otherUserBasicId);
    return { data: response, message: 'Respnse received successfully.' };
  }

  @ApiQuery({ name: 'diplayId', required: true })
  @Get('user_serach/:userBasicId')
  async getUserFromDisplayId(
    @Query('diplayId') diplayId: string,
    @Param('userBasicId') userBasicId: string,
  ) {
    console.log('display id', diplayId);
    const response = await this.userFacade.getUserFromDisplayId(
      userBasicId,
      diplayId,
    );
    return { data: response, message: 'Response received successfully.' };
  }

  @ApiQuery({ name: 'displayId', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'cast', required: false })
  @ApiQuery({ name: 'religion', required: false })
  @ApiQuery({ name: 'relationship', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'isVerified', required: false })
  @ApiQuery({ name: 'motherTongue', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get('admin/appUsers')
  async getAppUsersForAdmin(
    @Query('displayId') displayId: string,
    @Query('gender') gender: number,
    @Query('cast') cast: string,
    @Query('religion') religion: string,
    @Query('relationship') relationship: number,
    @Query('location') location: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('isVerified') isVerified: string,
    @Query('motherTongue') motherTongue: string,
    @Query('state') state: string,
    @Query('country') country: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('profileStatus') profileStatus:string,
  ) {
    let filterObj = {
      displayId,
      gender,
      cast,
      religion,
      relationship,
      location,
      startDate,
      endDate,
      isVerified,
      motherTongue,
      state,
      country,
      limit,
      offset,
      profileStatus
    };
    console.log(filterObj);
    const users = await this.userFacade.getAppUsersForAdmin(filterObj);
    let res= new ResponseService();
    return { data: users, message: 'All the users fetched successfully.' };
  }

  @Post('app/users/filter')
  async getFilteredUsers(@Body() userFilterDto: UserFilterDto) {
    const filteredUsers = await this.userFacade.getFilteredUsers(userFilterDto);
    return { data: filteredUsers, message: 'Users fetched successfully.' };
  }

  @Post('app/users/updateRegistrationStep/:userBasicId/:step')
  async updateRegistrationStep(@Param('userBasicId') userBasicId: string,@Param('userBasicId') step: number) {
       await this.userFacade.updateUserRegistrationStep(userBasicId,step);
    return { data: {}, message: 'Registration step updated successfully.' };
  }
  @ApiQuery({ name: 'visitedBy', required: true })
  @ApiQuery({ name: 'visitedTo', required: true })
  @Post('visit_profile')
  async visitedProfile(
    @Query('visitedBy') visitedBy: string,
    @Query('visitedTo') visitedTo: string,
  ) {
    const response = await this.userFacade.visistedProfile(
      visitedBy,
      visitedTo,
    );
    return { data: response, message: 'Visited profile updated.' };
  }

  @Get('recent_view/:userBasicId')
  async recentProfileViews(@Param('userBasicId') userBasicId: string) {
    const response = await this.userFacade.recentProfileViews(userBasicId);
    return {
      data: response,
      message: 'Rencely Visited Profiles.',
    };
  }

  @Get('profile_visited_by/:userBasicId')
  async getProifleVisitedBy(@Param('userBasicId') userBasicId: string) {
    const response = await this.userFacade.getProifleVisitedBy(userBasicId);
    return {
      data: response,
      message: 'Rencely Profile Visited By .',
    };
  }
  @Get('online_members/:userBasicId')
  async getOnlineMembers(@Param('userBasicId') userBasicId: string) {
    const response = await this.userFacade.getOnlineMembers(userBasicId);
    return {
      data: response,
      message: 'Online Members .',
    };
  }

  @Get('premium_members/:userBasicId')
  async getPremiumMembers(@Param('userBasicId') userBasicId: string) {
    const response = await this.userFacade.getPremiumMembers(userBasicId);
    console.log("response",response);
    return {
      data: response,
      message: ' Premium members profiles fetched.',
    };
  }
}
