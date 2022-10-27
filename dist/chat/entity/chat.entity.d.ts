import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class Chat extends AbstarctEntity {
    userbasicId: string;
    recieverBasicId: String;
    text: string;
    static createFaq(userbasicId: string, text: string, position: number): Chat;
    updateFaq(userbasicId: string, text: string, position: number): this;
}
