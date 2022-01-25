import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../libs/mocks/repository.type';
import { mockRepositoryConfig } from '../libs/mocks/repository.config';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockCommentRepository = mockRepositoryConfig;

describe('CommentService', () => {
  let service: CommentsService;
  let repository: MockRepository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository(),
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    repository = module.get<MockRepository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
