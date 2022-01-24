import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import * as faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<MockRepository<Post>>(getRepositoryToken(Post));
  });

  describe('create()', () => {
    const createPostDto: CreatePostDto = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    };
    const user: User = new User()

    it('should create Post', async () => {
      postRepository.save.mockRejectedValue('save error');

      const result = await service.create(createPostDto, user);
      expect(result).toEqual('save error');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
