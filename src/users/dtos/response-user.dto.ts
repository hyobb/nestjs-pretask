import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

export class ResponseUserDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _email: string;

  constructor(user: User) {
    this._id = user.id;
    this._name = user.name;
    this._email = user.email;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get email(): string {
    return this._email;
  }
}
