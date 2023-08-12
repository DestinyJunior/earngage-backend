import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/app/admin/schemas/admin.schema';

/**
 * Database repository class for admin entity
 */
@Injectable()
export class AdminRepositoryService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  /**
   * Checks if an admin entity with an email exists.
   */
  async existsByEmail(email: string) {
    const admin = await this.adminModel.findOne({ email }).exec();
    return admin !== null;
  }

  /**
   * Checks if an admin entity with a photo name exists.
   */
  async existsByPhotoName(photoName: string) {
    const admin = await this.adminModel
      .findOne({ 'photo.name': photoName })
      .exec();
    return admin !== null;
  }

  /**
   * Finds an admin entity with an id
   */
  findById(id: string) {
    return this.adminModel.findById(id).exec();
  }

  /**
   * Finds an admin entity with an email
   */
  findByEmail(email: string) {
    return this.adminModel.findOne({ email }).exec();
  }

  /**
   * Creates an admin entity
   */
  create({
    email,
    firstName,
    lastName,
    password,
    role,
  }: Pick<Admin, 'email' | 'firstName' | 'lastName' | 'password' | 'role'>) {
    return this.adminModel.create({
      role,
      email,
      firstName,
      lastName,
      password,
    });
  }

  /**
   * Updates an admin entity
   */
  update(
    _id: string,
    {
      firstName,
      lastName,
      bio,
      photo,
    }: Partial<Pick<Admin, 'firstName' | 'lastName' | 'bio' | 'photo'>>,
  ) {
    return this.adminModel
      .updateOne(
        { _id },
        {
          firstName,
          lastName,
          bio,
          photo,
        },
      )
      .exec();
  }

  /**
   * Updates an admin entity email
   */
  updateEmail(_id: string, email: string) {
    return this.adminModel.updateOne({ _id }, { email }).exec();
  }

  /**
   * Updates an admin entity password
   */
  updatePassword(_id: string, password: string) {
    return this.adminModel.updateOne({ _id }, { password }).exec();
  }
}
