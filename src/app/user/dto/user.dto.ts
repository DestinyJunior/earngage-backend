import { Exclude, Type } from 'class-transformer';
import { SchemaDto } from 'src/dto/schema.dto';
import { PhotoDto } from 'src/app/file-upload/dto/photo.dto';
import { UserStatus } from 'src/app/user/schemas/user.schema';

/**
 * Dto for transmitting a user entity
 */
export class UserDto extends SchemaDto {
  firstName: string;

  lastName: string;

  email: string;

  emailVerified: boolean;

  status: UserStatus;

  bio: string;

  jobRole: string;

  country: string;

  @Type(() => PhotoDto)
  photo: PhotoDto;

  @Type(() => PhotoDto)
  headerPhoto: PhotoDto;

  @Exclude()
  password: string;

  @Exclude()
  emailVerificationToken: string;

  @Exclude()
  resetPasswordToken: any;
}
