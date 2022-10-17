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
    getAllFaq(): Promise<faq[]>;
    getAllSuccess(): Promise<success_stories[]>;
    createSuccess(SuccessStoriesDto: SuccessStoriesDto): Promise<SuccessStoriesDto & success_stories>;
    createContent(ContentCreationDto: ContentCreationDto): Promise<ContentCreationDto & content_creation>;
    getAllContent(): Promise<content_creation[]>;
}
