import { Exclude } from 'class-transformer';

/**
 * Parent Schema DTO for all schemas
 * Usually extends properties directly from db
 */
export class SchemaDto {
  @Exclude()
  _id: string;

  id: string;

  createdAt: string;

  updatedAt: string;
}
