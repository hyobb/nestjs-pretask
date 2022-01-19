import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from '../entities/comment.entity';

export class ResponseCommentDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _user?: User;
  @Exclude() private readonly _userId: number;
  @Exclude() private readonly _post?: Post;
  @Exclude() private readonly _postId: number;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _createdAt: Date;

  constructor(comment: Comment) {
    this._id = comment.id;
    this._user = comment.user;
    this._userId = comment.userId;
    this._post = comment.post;
    this._postId = comment.postId;
    this._content = comment.content;
    this._createdAt = comment.createdAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get userId(): number {
    return this._userId;
  }

  @Expose()
  get postId(): number {
    return this._postId;
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
