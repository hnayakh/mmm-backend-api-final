import { CmsService } from './cms.service';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';
export declare class CmsFacade {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    createFaq(faqDto: FaqDto): Promise<FaqDto & faq>;
    updateFaq(faq: faq): Promise<any>;
    removeFaq(id: any): Promise<any>;
    removeContent(id: any): Promise<any>;
    removeSuccess(id: any): Promise<any>;
    updateSuccess(success_stories: success_stories): Promise<any>;
    updateContent(content_create: content_creation): Promise<any>;
    createSuccess(successDto: SuccessStoriesDto): Promise<SuccessStoriesDto & success_stories>;
    createContent(contentDto: ContentCreationDto): Promise<ContentCreationDto & content_creation>;
    getAllFaq(): Promise<faq[]>;
    getAllSuccess(): Promise<success_stories[]>;
    getAllContent(): Promise<content_creation[]>;
}
