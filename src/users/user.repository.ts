import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByName(name: string) {
    const users = await this.find({ name: name });

    return users;
  }

  async findByEmail(email: string) {
    const user = await this.findOne({ email: email });

    return user;
  }
}
