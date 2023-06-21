import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, Photo } from './schemas/photo.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(Photo.name) private FileModel: Model<FileDocument>,
  ) {}

  async create(data: Photo) {
    return await this.FileModel.create(data);
  }

  async findAll(query?: any) {
    return await this.FileModel.find(query).exec();
  }

  async findOne(id: Types.ObjectId) {
    return await this.FileModel.findOne({ _id: id });
  }

  async updateOne(id: Types.ObjectId, data: Photo) {
    return await this.FileModel.findByIdAndUpdate(id, data);
  }

  async remove(id: Types.ObjectId) {
    return await this.FileModel.findByIdAndDelete(id);
  }
}
