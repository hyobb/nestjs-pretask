import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGaurd } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
