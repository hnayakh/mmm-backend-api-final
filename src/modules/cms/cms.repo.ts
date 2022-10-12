import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';
import { getManager, Repository } from 'typeorm';
import { UserBasic } from '../user/entities/user-basic.entity';
import { FaqDto } from './dtos/faq.dto';
import { faq } from './entities/faq.entity';

@Injectable()
export class CmsRepo {
  constructor(
    @InjectRepository(faq)
    private readonly faq: Repository<faq>,
  ) {}
  async createFaq(faqDto: FaqDto) {
  return await this.faq.save(faqDto)
  }
  async getAllFaq(){
    return await this.faq.find()
  }
}
