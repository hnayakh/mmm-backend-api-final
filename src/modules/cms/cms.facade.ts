import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CmsService } from './cms.service';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';

@Injectable()
export class CmsFacade {
  constructor(private readonly cmsService: CmsService) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsService.createFaq(faqDto);
  }
  async createSuccess(successDto: SuccessStoriesDto) {
    return await this.cmsService.createSuccess(successDto);
  }
  async createContent(contentDto: ContentCreationDto) {
    return await this.cmsService.createContent(contentDto);
  }
  async getAllFaq() {
    return await this.cmsService.getAllFaq();
  }
  async getAllSuccess() {
    return await this.cmsService.getAllSuccess();
  }
  async getAllContent() {
    return await this.cmsService.getAllContent();
  }
}
