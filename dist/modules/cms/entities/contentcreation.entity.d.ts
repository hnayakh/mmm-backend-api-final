import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class content_creation extends AbstarctEntity {
    channel: string;
    template_name: string;
    content_heading: string;
    content: string;
    photo: string;
    position: number;
    static createSuccess(channel: string, template_name: string, content_heading: string, content: string, photo: string, position: number): content_creation;
    updateSuccess(channel: string, template_name: string, content_heading: string, content: string, photo: string, position: number): this;
}
