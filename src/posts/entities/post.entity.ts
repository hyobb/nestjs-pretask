import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../libs/entities/base.entity';
import * as faker from '@faker-js/faker';

@Entity('posts')
export class Post extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  static factory({
    params = {
      id: faker.datatype.number(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    },
    user = User.factory(),
  }: {
    params?: Partial<Post>;
    user?: User;
  } = {}): Post {
    const post = new Post();

    Object.assign(post, { ...params, user: user });
    return post;
  }
}
