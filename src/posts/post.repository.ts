import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
// 기존 메소드 오버라이드 방법. 익셉션 핸들링 위해. eX) findOneOrFail
