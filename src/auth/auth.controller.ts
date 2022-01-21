import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/libs/decorators/get-user.decorator';
import { BaseResponseDto } from 'src/libs/dtos/base-response.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGaurd } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User) {
    this.authService.login(user);

    return BaseResponseDto.OK('성공적으로 로그인 되었습니다.');
  }

  @UseGuards(JwtAuthGaurd)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return BaseResponseDto.OK_WITH(user);
  }
}
