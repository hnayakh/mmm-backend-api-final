import { CmsFacade } from './cms.facade';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';
export declare class CmsController {
    private readonly faqFacade;
    constructor(faqFacade: CmsFacade);
    createFaq(faqDto: FaqDto): Promise<{
        data: FaqDto & faq;
        message: string;
    }>;
    updateFaq(faq: faq): Promise<{
        data: any;
        message: string;
    }>;
    removeFaq(id: any): Promise<{
        data: any;
        message: string;
    }>;
    getAllFaq(): Promise<{
        data: faq[];
        message: string;
    }>;
    createSuccess(SuccessStoriesDto: SuccessStoriesDto): Promise<{
        data: SuccessStoriesDto & success_stories;
        message: string;
    }>;
    getAllSuccess(): Promise<{
        data: success_stories[];
        message: string;
    }>;
    updateSuccess(success_stories: success_stories): Promise<{
        data: any;
        message: string;
    }>;
    removeSuccess(id: any): Promise<{
        data: any;
        message: string;
    }>;
    removecontent(id: any): Promise<{
        data: any;
        message: string;
    }>;
    createContent(ContentCreationDto: ContentCreationDto): Promise<{
        data: ContentCreationDto & content_creation;
        message: string;
    }>;
    getAllContent(): Promise<{
        data: content_creation[];
        message: string;
    }>;
    updateContent(content_creation: content_creation): Promise<{
        data: any;
        message: string;
    }>;
}
