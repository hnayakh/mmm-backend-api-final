import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { faqFacade } from './cms.facade';
import { FaqDto } from './dtos/faq.dto';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly faqFacade: faqFacade) {}
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
}
