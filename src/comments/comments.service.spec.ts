import { Test, TestingModule } from '@nestjs/testing';
import { CommentRepository } from './comments.repository';
import { CommentsService } from './comments.service';

describe('CommentService', () => {
  let service: CommentsService;
  let repository: CommentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, CommentRepository],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    repository = module.get<CommentRepository>(CommentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
