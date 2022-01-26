import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: [`수정 권한이 없습니다.(custom)`],
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
