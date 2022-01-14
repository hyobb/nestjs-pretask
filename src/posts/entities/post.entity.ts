import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '../../common/base.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}