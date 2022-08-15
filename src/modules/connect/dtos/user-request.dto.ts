import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class UserRequestDto {
  @ApiProperty()
  requestingUserBasicId: string;

  @ApiProperty()
  requestedUserBasicId: string;

  @ApiProperty()
  userRequestId: string;

  // 0 = Add
  // 1 = Accept
  // 2 = Reject
  // 3 = Revert
  // 4 = RemovedByRequestedUser
  // 5 = RemovedByRequestingUser
  @ApiProperty()
  operation: number;
}
