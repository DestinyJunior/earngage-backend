import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { GenerateOptions } from 'randomstring';

export type MediaFileDocument = MediaFile & Document;

/**
 * MediaFile schema
 */
@Schema({ timestamps: true, collection: 'files' })
export class MediaFile {
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

export const MediaFileSchema = SchemaFactory.createForClass(MediaFile);
