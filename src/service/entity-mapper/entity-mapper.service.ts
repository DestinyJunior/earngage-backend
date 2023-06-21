import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Photo } from 'src/app/file-upload/schemas/photo.schema';

/**
 * Service for mapping objects.
 */
@Injectable()
export class EntityMapperService {
  /**
   * Maps a or an array of database entities to dto.
   */
  entityToDto<T>(classConstructor: ClassConstructor<T>, plain: any) {
    if (plain != null) {
      plain = Array.isArray(plain)
        ? plain.map((item: any) => item.toObject({ virtuals: true }))
        : plain.toObject({ virtuals: true });
    } else {
      plain = {};
    }

    return plainToInstance(classConstructor, plain, {
      ignoreDecorators: true,
      enableCircularCheck: true,
    });
  }

  /**
   * Maps a or an array of database entities to dto.
   */
  mongooseEntityToClass<T>(classConstructor: ClassConstructor<T>, plain: any) {
    plain = Array.isArray(plain)
      ? plain.map((item: any) => item.toObject({ virtuals: true }))
      : plain.toObject({ virtuals: true });

    return plainToInstance(classConstructor, plain, {
      ignoreDecorators: true,
      enableCircularCheck: true,
    });
  }

  /**
   * Maps a dto to a database entity object
   */
  dtoToEntity<T>(classConstructor: ClassConstructor<T>, plain: any) {
    return plainToInstance(classConstructor, plain, {
      ignoreDecorators: true,
      enableCircularCheck: true,
    });
  }

  // multerFileToPhoto(file: Express.MulterS3.File) {
  //   const photo = new Photo();
  //   photo.name = file.key;
  //   photo.size = file.size;
  //   photo.url = file.location;
  //   photo.mimetype = file.mimetype;
  //   return photo;
  // }
}
