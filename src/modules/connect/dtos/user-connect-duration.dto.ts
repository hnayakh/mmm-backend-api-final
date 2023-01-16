import { ApiProperty } from '@nestjs/swagger';

export class UserConnectDurationDto {
  @ApiProperty()
  userConnectRequestId: string;

  @ApiProperty()
  userOneBasicId: string;

  @ApiProperty()
  userTwoBasicId: string;

  @ApiProperty()
  usedDuration: number;
}

export class UserConnectRequestDto {
  @ApiProperty()
  userConnectRequestId: string;

  @ApiProperty()
  userOneBasicId: string;

  @ApiProperty()
  userTwoBasicId: string;

  @ApiProperty()
  type: string;
}
