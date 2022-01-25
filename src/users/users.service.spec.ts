import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../libs/mocks/repository.type';
import { mockRepositoryConfig } from '../libs/mocks/repository.config';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = mockRepositoryConfig;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
