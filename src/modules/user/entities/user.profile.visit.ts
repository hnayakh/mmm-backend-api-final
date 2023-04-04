import { AbstarctEntity } from "src/shared/entities/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserBasic } from "./user-basic.entity";

@Entity("profile_visit")
export class ProfileVisit extends AbstarctEntity {

    @ManyToOne((type) => UserBasic, (userBasic) => userBasic.visitedById)
    visitedById: UserBasic;

    @ManyToOne((type) => UserBasic, (userBasic) => userBasic.visitedToId)
    visitedToId: UserBasic;

    static createVisit(visitedBy, visitedTo): ProfileVisit {
        const visitedObj = new ProfileVisit();
        visitedObj.visitedById = visitedBy;
        visitedObj.visitedToId = visitedTo;
        return visitedObj;
    }
}