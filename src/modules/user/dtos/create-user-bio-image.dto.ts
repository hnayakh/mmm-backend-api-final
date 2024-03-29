import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserImageDto {
  @ApiProperty()
  imageUrl: string;

  @ApiProperty({ example: false })
  isDefault: boolean;
}
export class CreateUserImageDocsDto {

  @IsNotEmpty({ message: 'Identification Proof can not be empty.' })
  @ApiProperty()
  imageUrl: string;

  // @IsNotEmpty({ message: 'Identification Proof can not be empty.' })
  @ApiProperty({ example: 'My Passport' })
  idProof: string;

  @ApiProperty({ example: false })
  isDefaultImage: boolean;
}

export class CreateUserBioImageDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'About can not be empty.' })
  @ApiProperty({ example: 'I am from Bhubaneswar.' })
  aboutMe: string;

  @ApiProperty({ type: [CreateUserImageDto] })
  userImages: CreateUserImageDto[];
}
export class UpdateUserDocsDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  // @IsNotEmpty({ message: 'Identification Proof can not be empty.' })
  @ApiProperty({ example: 'My Passport' })
  idProof: string;

  @ApiProperty({ type: [CreateUserImageDocsDto] })
  userDocImages: CreateUserImageDocsDto[];

 

  // @IsNotEmpty({ message: 'About can not be empty.' })
  // @ApiProperty({ example: 'I am from Bhubaneswar.' })
  // aboutMe: string;

  @ApiProperty({ type: [CreateUserImageDocsDto] })
  userDocs: CreateUserImageDocsDto[];
}
