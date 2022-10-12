import { Injectable } from '@nestjs/common';
import { CmsRepo } from './cms.repo';
import { FaqDto } from './dtos/faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly cmsRepo: CmsRepo) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsRepo.createFaq(faqDto);
  }
  async getAllFaq(){
    return await this.cmsRepo.getAllFaq();
  }
}
