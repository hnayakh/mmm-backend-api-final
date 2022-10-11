import { faqFacade } from './cms.facade';
import { FaqDto } from './dtos/faq.dto';
export declare class CmsController {
    private readonly faqFacade;
    constructor(faqFacade: faqFacade);
    createFaq(faqDto: FaqDto): Promise<{
        data: FaqDto & import("./entities/faq.entity").faq;
        message: string;
    }>;
    getAllFaq(): Promise<{
        data: import("./entities/faq.entity").faq[];
        message: string;
    }>;
}
