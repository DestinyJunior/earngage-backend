import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  invalidErrorMessage,
  requiredErrorMessage,
} from 'src/error/validation-error.function';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
/**
 * Dto for updating a user data
 */
export class UpdateUserProfile {
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  firstName?: string;

  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  lastName?: string;

  @IsString(invalidErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  bio?: string;

  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  country?: string;

  @Allow()
  photo: MediaFile;
}
