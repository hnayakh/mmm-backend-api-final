import { AbstarctEntity } from "src/shared/entities/abstract.entity";
import { UserBasic } from "./user-basic.entity";
export declare class ProfileVisit extends AbstarctEntity {
    visitedBy: UserBasic;
    visitedTo: UserBasic;
    static createVisit(visitedBy: any, visitedTo: any): ProfileVisit;
}
