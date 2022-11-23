import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CmsFacade } from './cms.facade';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly faqFacade: CmsFacade) {}
  @Post('faq')
  async createFaq(@Body() faqDto: FaqDto) {
    const faqObj = await this.faqFacade.createFaq(faqDto);
    return { data: faqObj, message: ' successfully created!!!' };
  }
  @Put('faq')
  async updateFaq(@Body() faq: faq) {
    const faqObj = await this.faqFacade.updateFaq(faq);
    return { data: faqObj, message: ' successfully updated!!!' };
  }
  @Delete('faq/:id')
  async removeFaq(@Param() id: any) {
    try {
      const faqObj = await this.faqFacade.removeFaq(id);
      return { data: faqObj, message: ' successfully updated!!!' };
    } catch (error) {}
  }
  @Get('faq/all')
  async getAllFaq() {
    const result = await this.faqFacade.getAllFaq();
    return { data: result, message: 'Results fetched successfully.' };
  }
  @Post('success_stories')
  async createSuccess(@Body() SuccessStoriesDto: SuccessStoriesDto) {
    const faqObj = await this.faqFacade.createSuccess(SuccessStoriesDto);
    return { data: faqObj, message: ' successfully created!!!' };
  }
  @Get('success_stories/all')
  async getAllSuccess() {
    const result = await this.faqFacade.getAllSuccess();
    return { data: result, message: 'Results fetched successfully.' };
  }
  @Put('success_stories')
  async updateSuccess(@Body() success_stories: success_stories) {
    const faqObj = await this.faqFacade.updateSuccess(success_stories);
    return { data: faqObj, message: ' successfully updated!!!' };
  }
  @Delete('success_stories/:id')
  async removeSuccess(@Param() id: any) {
    try {
      const faqObj = await this.faqFacade.removeSuccess(id);
      return { data: faqObj, message: ' successfully updated!!!' };
    } catch (error) {}
  }
  @Delete('content_creation/:id')
  async removecontent(@Param() id: any) {
    try {
      const faqObj = await this.faqFacade.removeContent(id);
      return { data: faqObj, message: ' successfully updated!!!' };
    } catch (error) {}
  }
  @Post('content_creation')
  async createContent(@Body() ContentCreationDto: ContentCreationDto) {
    const faqObj = await this.faqFacade.createContent(ContentCreationDto);
    return { data: faqObj, message: ' successfully created!!!' };
  }
  @Get('content_creation/all')
  async getAllContent() {
    const result = await this.faqFacade.getAllContent();
    return { data: result, message: 'Results fetched successfully.' };
  }
  @Put('content_creation')
  async updateContent(@Body() content_creation: content_creation) {
    const faqObj = await this.faqFacade.updateContent(content_creation);
    return { data: faqObj, message: ' successfully updated!!!' };
  }
}
