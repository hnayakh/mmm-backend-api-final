import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FaqService } from './cms.service';
import { FaqDto } from './dtos/faq.dto';

@Injectable()
export class faqFacade {
  constructor(private readonly cmsService:FaqService) {}
  async createFaq(faqDto: FaqDto) {
    return await this.cmsService.createFaq(faqDto)
  }
  async getAllFaq(){
    return await this.cmsService.getAllFaq();
  }
}
