import { CmsRepo } from './cms.repo';
import { FaqDto } from './dtos/faq.dto';
export declare class FaqService {
    private readonly cmsRepo;
    constructor(cmsRepo: CmsRepo);
    createFaq(faqDto: FaqDto): Promise<FaqDto & import("./entities/faq.entity").faq>;
    getAllFaq(): Promise<import("./entities/faq.entity").faq[]>;
}
