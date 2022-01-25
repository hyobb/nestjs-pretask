import { BaseEntity } from '../../libs/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import * as faker from '@faker-js/faker';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  static factory({
    params = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'password',
    },
  }: {
    params?: Partial<User>;
  } = {}): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}
