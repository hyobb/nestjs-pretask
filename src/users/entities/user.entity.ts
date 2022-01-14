import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
