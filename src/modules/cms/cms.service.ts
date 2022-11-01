import { Injectable } from '@nestjs/common';
import { CmsRepo } from './cms.repo';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';

@Injectable()
export class CmsService {
  constructor(private readonly cmsRepo: CmsRepo) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsRepo.createFaq(faqDto);
  }
  async updateFaq(faq: faq) {
    return await this.cmsRepo.updateFaq(faq);
  }
  async removeFaq(id: any) {
    return await this.cmsRepo.removeFaq(id);
  }
  async removeContent(id: any) {
    return await this.cmsRepo.removeContent(id);
  }
  async removeSuccess(id: any) {
    return await this.cmsRepo.removeSuccess(id);
  }
  async updateSuccess(success_stories: success_stories) {
    return await this.cmsRepo.updateSuccess(success_stories);
  }
  async updateContent(content_creates: content_creation) {
    return await this.cmsRepo.updateContent(content_creates);
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
