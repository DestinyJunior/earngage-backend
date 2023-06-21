import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { GenerateOptions } from 'randomstring';

export type FileDocument = Photo & Document;

/**
 * Photo schema
 */
@Schema({ timestamps: true, collection: 'files' })
export class Photo {
  static readonly NAME_CONFIG: GenerateOptions = {
    length: 20,
  };

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  mimetype: string;

  @Exclude()
  metadata?: Map<string, string>;
}

export const FileSchema = SchemaFactory.createForClass(Photo);
