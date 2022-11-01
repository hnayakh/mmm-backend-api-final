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
        data: {
            question: string;
            answer: string;
            position: number;
            id: string;
            createdAt: string;
            createdBy: string;
            updatedAt: string;
            updatedBy: string;
            isActive: boolean;
        } & faq;
        message: string;
    }>;
    removeFaq(faq: faq): Promise<{
        data: faq;
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
        data: {
            heading: string;
            story: string;
            photo: string;
            position: number;
            id: string;
            createdAt: string;
            createdBy: string;
            updatedAt: string;
            updatedBy: string;
            isActive: boolean;
        } & success_stories;
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
        data: {
            channel: string;
            template_name: string;
            content_heading: string;
            content: string;
            photo: string;
            position: number;
            id: string;
            createdAt: string;
            createdBy: string;
            updatedAt: string;
            updatedBy: string;
            isActive: boolean;
        } & content_creation;
        message: string;
    }>;
}
