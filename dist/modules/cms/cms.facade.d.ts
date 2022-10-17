import { CmsService } from './cms.service';
import { ContentCreationDto } from './dtos/contentcreation.dto';
import { FaqDto } from './dtos/faq.dto';
import { SuccessStoriesDto } from './dtos/successstories.dto';
export declare class CmsFacade {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    createFaq(faqDto: FaqDto): Promise<FaqDto & import("./entities/faq.entity").faq>;
    createSuccess(successDto: SuccessStoriesDto): Promise<SuccessStoriesDto & import("./entities/successstories.enity").success_stories>;
    createContent(contentDto: ContentCreationDto): Promise<ContentCreationDto & import("./entities/contentcreation.entity").content_creation>;
    getAllFaq(): Promise<import("./entities/faq.entity").faq[]>;
    getAllSuccess(): Promise<import("./entities/successstories.enity").success_stories[]>;
    getAllContent(): Promise<import("./entities/contentcreation.entity").content_creation[]>;
}
