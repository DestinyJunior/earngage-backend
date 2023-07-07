import {
  Controller,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { LocalAdminAuthGuard } from 'src/app/auth/guards/local-admin-auth.guard';
import { LocalAuthGuard } from 'src/app/auth/guards/local-auth.guard';
import { LocalEmailTokenAuthGuard } from 'src/app/auth/guards/local-email-token-auth.guard';
import { UserParam } from 'src/decorator/user-param.decorator';
import { ResponseDto } from 'src/dto/response.dto';
import { User } from 'src/app/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { CreateLoginAuthCode } from './dto/create-auth-code.dto';

/**
 * Controller for handling auth requests.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private userService: UserService,
  ) {}

  /**
   * Handles user login with email & password.
   */
  @Post('user/get-code')
  @HttpCode(HttpStatus.OK)
  async userLoginCode(@Body() phoneData: CreateLoginAuthCode) {
    await this.authService.getAuthCode(phoneData.phoneNumber);
    return ResponseDto.success('Auth code sent');
  }

  /**
   * Handles user login with email & password.
   */
  @Post('user/verify-code')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async userLogin(@UserParam() user: User) {
    const accessToken = await this.authService.getAccessToken(user);
    return ResponseDto.success('User authenticated', accessToken);
  }

  /**
   * Handles admin login with email & password.
   */
  @Post('admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAdminAuthGuard)
  async adminLogin(@UserParam() admin: Admin) {
    const accessToken = await this.authService.getAdminAccessToken(admin);
    return ResponseDto.success('Admin authenticated', accessToken);
  }

  /**
   * Handles user login with email & email-verification-token.
   */
  @Post('email-verification-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalEmailTokenAuthGuard)
  async emailVerificationToken(@UserParam() user: User) {
    const accessToken = await this.authService.getAccessToken(user);
    return ResponseDto.success('User authenticated', accessToken);
  }
}
