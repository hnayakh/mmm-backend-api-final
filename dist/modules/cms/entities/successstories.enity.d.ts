import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class success_stories extends AbstarctEntity {
    heading: string;
    story: string;
    photo: string;
    position: number;
    static createSuccess(heading: string, story: string, photo: string, position: number): success_stories;
    updateSuccess(heading: string, story: string, photo: string, position: number): this;
}
