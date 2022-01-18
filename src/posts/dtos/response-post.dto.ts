import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Post } from '../entities/post.entity';

export class ResponsePostDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _user?: User;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _createdAt: Date;

  constructor(post: Post) {
    this._id = post.id;
    this._user = post.user;
    this._title = post.title;
    this._content = post.content;
    this._createdAt = post.createdAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get userId(): number {
    return this._user && this._user.id;
  }

  @Expose()
  get title(): string {
    return this._title;
  }

  @Expose()
  get content(): string {
    return this._content;
  }

  @Expose()
  get createAt(): string {
    return this._createdAt.toDateString();
  }
}
