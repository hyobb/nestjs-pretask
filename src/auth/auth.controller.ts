import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { GetUser } from '../libs/decorators/get-user.decorator';
import { BaseResponseDto } from '../libs/dtos/base-response.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGaurd } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User) {
    console.log(1213123);
    this.authService.login(user);

    return BaseResponseDto.OK('성공적으로 로그인 되었습니다.');
  }

  @UseGuards(JwtAuthGaurd)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return BaseResponseDto.OK_WITH(user);
  }
}
