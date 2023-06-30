import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AdminRole } from 'src/app/admin/schemas/admin-role.enum';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export type AdminDocument = Admin & Document;

/**
 * Admin entity
 */
@Schema({ timestamps: true })
export class Admin {
  static readonly PHOTO_PATH = 'admin/';

  id: string;

  createdAt: string;

  updatedAt: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: AdminRole;

  @Prop()
  bio?: string;

  @Prop({ ref: MediaFile.name, type: mongoose.Types.ObjectId })
  photo?: mongoose.Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
