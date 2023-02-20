import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
@Entity('user_blocks')
export class UserBlock extends AbstarctEntity {
  @Column()
  block_who: string;

  @Column()
  block_whom: string;

  static createUserBlock(block_who: string, block_whom: string) {
    const userBlock = new UserBlock();
    userBlock.block_who = block_who;
    userBlock.block_whom = block_whom;
    return userBlock;
  }
}
