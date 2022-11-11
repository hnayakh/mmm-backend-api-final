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
  async removeFaq(id: any) {
    const entityManager = getManager();
    const rawQuery = `DELETE  FROM faq WHERE id ='${id.id}';`;
    console.log(rawQuery);
    const faq = await entityManager.query(rawQuery);
    return faq;
  }
  async removeContent(id: any) {
    const entityManager = getManager();
    const rawQuery = `DELETE  FROM content_creation WHERE id ='${id.id}';`;
    console.log(rawQuery);
    const faq = await entityManager.query(rawQuery);
    return faq;
  }
  async removeSuccess(id: any) {
    const entityManager = getManager();
    const rawQuery = `DELETE  FROM success_stories WHERE id ='${id.id}';`;
    console.log(rawQuery);
    const faq = await entityManager.query(rawQuery);
    return faq;
  }
  async updateFaq(faq: faq) {
    const entityManager = getManager();
    const rawQuery = `UPDATE faq SET question = '${faq.question}' , answer = '${faq.answer}' WHERE (id = '${faq.id}');`;
    console.log(rawQuery);
    const faqUpdate = await entityManager.query(rawQuery);
    return faqUpdate;
  }
  async updateSuccess(success_stories: success_stories) {
    const entityManager = getManager();
    const rawQuery = `UPDATE success_stories SET heading = '${success_stories.heading}' , story = '${success_stories.story}' WHERE (id = '${success_stories.id}');`;
    console.log(rawQuery);
    const faqUpdate = await entityManager.query(rawQuery);
    return faqUpdate;
  }
  async updateContent(content_creation: content_creation) {
    const entityManager = getManager();
    const rawQuery = `UPDATE content_creation SET 
     channel = '${content_creation.channel}' ,
     content = '${content_creation.content}',
     template_name = '${content_creation.template_name}',
     content_heading = '${content_creation.content_heading}'
     WHERE (id = '${content_creation.id}');`;
    console.log(rawQuery);
    const faqUpdate = await entityManager.query(rawQuery);
    return faqUpdate;
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
