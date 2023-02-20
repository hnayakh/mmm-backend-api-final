import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class UserBlock extends AbstarctEntity {
    block_who: string;
    block_whom: string;
    static createUserBlock(block_who: string, block_whom: string): UserBlock;
}
