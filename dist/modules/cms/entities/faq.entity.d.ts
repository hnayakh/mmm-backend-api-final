import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class faq extends AbstarctEntity {
    question: string;
    answer: string;
    position: number;
    static createFaq(question: string, answer: string, position: number): faq;
    updateFaq(question: string, answer: string, position: number): this;
}
