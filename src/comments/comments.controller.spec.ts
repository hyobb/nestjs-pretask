import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepositoryConfig } from '../libs/mocks/repository.config';
import { MockRepository } from '../libs/mocks/repository.type';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

const mockCommentRepository = mockRepositoryConfig;

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;
  let repository: MockRepository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository(),
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
    repository = module.get<MockRepository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
