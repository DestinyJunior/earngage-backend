import { Type } from 'class-transformer';
import { SchemaDto } from 'src/dto/schema.dto';
import { PhotoDto } from 'src/app/file-upload/dto/photo.dto';
import { UserStatus } from 'src/app/user/schemas/user.schema';
import { PhoneNumberField } from '../schemas/phone-number.schema';

/**
 * Dto for transmitting a user entity
 */
export class UserDto extends SchemaDto {
  firstName?: string;

  lastName?: string;

  status: UserStatus;

  @Type(() => PhotoDto)
  photo?: PhotoDto;

  @Type(() => PhotoDto)
  headerPhoto?: PhotoDto;

  username: string;

  @Type(() => PhoneNumberField)
  phoneNumber: PhoneNumberField;

  tiktokHandle?: string;
}
