import { AbstarctEntity } from "src/shared/entities/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserBasic } from "./user-basic.entity";

@Entity("profile_visit")
export class ProfileVisit extends AbstarctEntity {

    @ManyToOne((type) => UserBasic, (userBasic) => userBasic.visitedBy)
    visitedBy: UserBasic;

    @ManyToOne((type) => UserBasic, (userBasic) => userBasic.visitedTo)
    visitedTo: UserBasic;

    static createVisit(visitedBy, visitedTo): ProfileVisit {
        const visitedObj = new ProfileVisit();
        visitedObj.visitedBy = visitedBy;
        visitedObj.visitedTo = visitedTo;
        return visitedObj;
    }
}