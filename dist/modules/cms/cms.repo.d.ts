import { Repository } from 'typeorm';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';
export declare class CmsRepo {
    private readonly success_stories;
    private readonly faq;
    private readonly content_creation;
    constructor(success_stories: Repository<success_stories>, faq: Repository<faq>, content_creation: Repository<content_creation>);
    createFaq(faqDto: FaqDto): Promise<FaqDto & faq>;
    removeFaq(id: any): Promise<any>;
    removeContent(id: any): Promise<any>;
    removeSuccess(id: any): Promise<any>;
    updateFaq(faq: faq): Promise<any>;
    updateSuccess(success_stories: success_stories): Promise<any>;
    updateContent(content_creation: content_creation): Promise<any>;
    getAllFaq(): Promise<faq[]>;
    getAllSuccess(): Promise<success_stories[]>;
    createSuccess(SuccessStoriesDto: SuccessStoriesDto): Promise<SuccessStoriesDto & success_stories>;
    createContent(ContentCreationDto: ContentCreationDto): Promise<ContentCreationDto & content_creation>;
    getAllContent(): Promise<content_creation[]>;
}
