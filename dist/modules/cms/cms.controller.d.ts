import { CmsFacade } from './cms.facade';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
export declare class CmsController {
    private readonly faqFacade;
    constructor(faqFacade: CmsFacade);
    createFaq(faqDto: FaqDto): Promise<{
        data: FaqDto & import("./entities/faq.entity").faq;
        message: string;
    }>;
    getAllFaq(): Promise<{
        data: import("./entities/faq.entity").faq[];
        message: string;
    }>;
    createSuccess(SuccessStoriesDto: SuccessStoriesDto): Promise<{
        data: SuccessStoriesDto & import("./entities/successstories.enity").success_stories;
        message: string;
    }>;
    getAllSuccess(): Promise<{
        data: import("./entities/successstories.enity").success_stories[];
        message: string;
    }>;
    createContent(ContentCreationDto: ContentCreationDto): Promise<{
        data: ContentCreationDto & import("./entities/contentcreation.entity").content_creation;
        message: string;
    }>;
    getAllContent(): Promise<{
        data: import("./entities/contentcreation.entity").content_creation[];
        message: string;
    }>;
}
