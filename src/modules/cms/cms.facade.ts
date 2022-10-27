import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CmsService } from './cms.service';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';

@Injectable()
export class CmsFacade {
  constructor(private readonly cmsService: CmsService) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsService.createFaq(faqDto);
  }
  async updateFaq(faq: faq) {
    return await this.cmsService.updateFaq(faq);
  }
  async updateSuccess(success_stories: success_stories) {
    return await this.cmsService.updateSuccess(success_stories);
  }
  async updateContent(content_create: content_creation) {
    return await this.cmsService.updateContent(content_create);
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
