import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    console.log(123);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`존재하지 않는 사용자 입니다.`],
        error: 'Not Found',
      });
    }

    const isValidPassword = password === user.password;

    if (isValidPassword) {
      return user;
    } else {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [`비밀번호가 일치하지 않습니다.`],
        error: 'Bad Request',
      });
    }
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
