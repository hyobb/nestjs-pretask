import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../libs/entities/base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column('text', { nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column()
  postId: number;
}
