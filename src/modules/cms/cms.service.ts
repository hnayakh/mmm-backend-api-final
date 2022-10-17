import { Injectable } from '@nestjs/common';
import { CmsRepo } from './cms.repo';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';

@Injectable()
export class CmsService {
  constructor(private readonly cmsRepo: CmsRepo) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsRepo.createFaq(faqDto);
  }
  async createSuccess(successDto: SuccessStoriesDto) {
    return await this.cmsRepo.createSuccess(successDto);
  }
  async createContent(contentDto: ContentCreationDto) {
    return await this.cmsRepo.createContent(contentDto);
  }
  async getAllFaq() {
    return await this.cmsRepo.getAllFaq();
  }
  async getAllSuccess() {
    return await this.cmsRepo.getAllSuccess();
  }
  async getAllContent() {
    return await this.cmsRepo.getAllContent();
  }
}
