import { Exclude, Type } from 'class-transformer';
import { AdminRole as Role } from 'src/app/admin/schemas/admin-role.enum';
import { SchemaDto } from 'src/dto/schema.dto';
import { PhotoDto } from 'src/app/file-upload/dto/photo.dto';

export class AdminDto extends SchemaDto {
  firstName: string;

  lastName: string;

  email: string;

  bio?: string;

  role: Role;

  @Type(() => PhotoDto)
  photo?: PhotoDto;

  @Exclude()
  password: string;
}
