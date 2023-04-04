import { AbstarctEntity } from "src/shared/entities/abstract.entity";
import { UserBasic } from "./user-basic.entity";
export declare class ProfileVisit extends AbstarctEntity {
    visitedById: UserBasic;
    visitedToId: UserBasic;
    static createVisit(visitedBy: any, visitedTo: any): ProfileVisit;
}
