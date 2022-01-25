import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepositoryConfig } from '../libs/mocks/repository.config';
import { MockRepository } from '../libs/mocks/repository.type';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

const mockPostRepository = mockRepositoryConfig;

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;
  let postRepository: MockRepository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
    postRepository = module.get<MockRepository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
