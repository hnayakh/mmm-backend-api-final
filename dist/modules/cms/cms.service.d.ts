import { CmsRepo } from './cms.repo';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
import { content_creation } from './entities/contentcreation.entity';
import { faq } from './entities/faq.entity';
import { success_stories } from './entities/successstories.enity';
export declare class CmsService {
    private readonly cmsRepo;
    constructor(cmsRepo: CmsRepo);
    createFaq(faqDto: FaqDto): Promise<FaqDto & faq>;
    updateFaq(faq: faq): Promise<{
        question: string;
        answer: string;
        position: number;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & faq>;
    removeFaq(faq: faq): Promise<faq>;
    updateSuccess(success_stories: success_stories): Promise<{
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
    } & success_stories>;
    updateContent(content_creates: content_creation): Promise<{
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
    } & content_creation>;
    createSuccess(successDto: SuccessStoriesDto): Promise<SuccessStoriesDto & success_stories>;
    createContent(contentDto: ContentCreationDto): Promise<ContentCreationDto & content_creation>;
    getAllFaq(): Promise<faq[]>;
    getAllSuccess(): Promise<success_stories[]>;
    getAllContent(): Promise<content_creation[]>;
}
