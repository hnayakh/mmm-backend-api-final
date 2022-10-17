import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserRequestState,
  UserRequestStatus,
} from 'src/shared/enums/miscellaneous.enum';
import { getManager, Repository } from 'typeorm';
import { UserBasic } from '../user/entities/user-basic.entity';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';

@Injectable()
export class CmsRepo {
  constructor(
    @InjectRepository(success_stories)
    private readonly success_stories: Repository<success_stories>,
    @InjectRepository(faq)
    private readonly faq: Repository<faq>,

    @InjectRepository(content_creation)
    private readonly content_creation: Repository<content_creation>,
  ) {}
  async createFaq(faqDto: FaqDto) {
    return await this.faq.save(faqDto);
  }
  async getAllFaq() {
    return await this.faq.find();
  }
  async getAllSuccess() {
    return await this.success_stories.find();
  }
  async createSuccess(SuccessStoriesDto: SuccessStoriesDto) {
    return await this.success_stories.save(SuccessStoriesDto);
  }
  async createContent(ContentCreationDto: ContentCreationDto) {
    return await this.content_creation.save(ContentCreationDto);
  }
  async getAllContent() {
    return await this.content_creation.find();
  }
}
