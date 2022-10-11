import { Repository } from 'typeorm';
import { FaqDto } from './dtos/faq.dto';
import { faq } from './entities/faq.entity';
export declare class CmsRepo {
    private readonly faq;
    constructor(faq: Repository<faq>);
    createFaq(faqDto: FaqDto): Promise<FaqDto & faq>;
    getAllFaq(): Promise<faq[]>;
}
