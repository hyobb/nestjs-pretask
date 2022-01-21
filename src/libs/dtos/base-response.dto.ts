import { Exclude, Expose } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

export class BaseResponseDto<T> {
  @Exclude() private readonly _statusCode: number;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: HttpStatus, message: string, data: T) {
    this._statusCode = status;
    this._message = message;
    this._data = data;
  }

  static OK(message = ''): BaseResponseDto<string> {
    return new BaseResponseDto<string>(HttpStatus.OK, message, '');
  }

  static OK_WITH<T>(data: T, message = ''): BaseResponseDto<T> {
    return new BaseResponseDto<T>(HttpStatus.OK, message, data);
  }

  @Expose()
  get statusCode(): number {
    return this._statusCode;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}
