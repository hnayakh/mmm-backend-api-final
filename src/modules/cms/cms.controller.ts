import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CmsFacade } from './cms.facade';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly faqFacade: CmsFacade) {}
  @Post('faq')
  async createFaq(@Body() faqDto: FaqDto) {
    const faqObj = await this.faqFacade.createFaq(faqDto);
    return { data: faqObj, message: ' successfully created!!!' };
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
}
