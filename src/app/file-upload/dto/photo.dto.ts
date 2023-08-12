import { SchemaDto } from 'src/dto/schema.dto';

export class PhotoDto extends SchemaDto {
  name: string;
  url: string;
  size: number;
  mimetype: string;
  metadata?: Map<string, string>;
}
