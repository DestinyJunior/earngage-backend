import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MediaFileDocument, MediaFile } from './schemas/file.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(MediaFile.name) private FileModel: Model<MediaFileDocument>,
  ) {}

  async create(data: MediaFile) {
    return await this.FileModel.create(data);
  }

  async findAll(query?: any) {
    return await this.FileModel.find(query).exec();
  }

  async findOne(id: Types.ObjectId) {
    return await this.FileModel.findOne({ _id: id });
  }

  async updateOne(id: Types.ObjectId, data: MediaFile) {
    return await this.FileModel.findByIdAndUpdate(id, data);
  }

  async remove(id: Types.ObjectId) {
    return await this.FileModel.findByIdAndDelete(id);
  }
}
