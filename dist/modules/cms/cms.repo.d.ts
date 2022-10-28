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
    removeFaq(faqDto: FaqDto): Promise<import("typeorm").DeleteResult>;
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
    getAllFaq(): Promise<faq[]>;
    getAllSuccess(): Promise<success_stories[]>;
    createSuccess(SuccessStoriesDto: SuccessStoriesDto): Promise<SuccessStoriesDto & success_stories>;
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
    createContent(ContentCreationDto: ContentCreationDto): Promise<ContentCreationDto & content_creation>;
    getAllContent(): Promise<content_creation[]>;
    updateContent(content_creation: content_creation): Promise<{
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
}
