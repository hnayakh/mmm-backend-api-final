import { FaqService } from './cms.service';
import { FaqDto } from './dtos/faq.dto';
export declare class faqFacade {
    private readonly cmsService;
    constructor(cmsService: FaqService);
    createFaq(faqDto: FaqDto): Promise<FaqDto & import("./entities/faq.entity").faq>;
    getAllFaq(): Promise<import("./entities/faq.entity").faq[]>;
}
