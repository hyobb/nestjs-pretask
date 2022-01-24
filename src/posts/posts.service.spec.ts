import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import * as faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { PostRepository } from './post.repository';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        PostRepository,
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  describe('create()', () => {
    let createPostDto: CreatePostDto;

    beforeEach(() => {
      createPostDto = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      };
    })

    describe('유저가 주어지지 않는다면', () => {
      const user: User = undefined;

      it('UnauthorizedException 예외를 던진다', async () => {
        try {
          await service.create(createPostDto, user);
        } catch (e) {
          expect(e).toBeInstanceOf(UnauthorizedException);
        }
      })

    })
    const user: User = new User();

    it('should create Post', async () => {

      const result = await service.create(createPostDto, user);
      expect(result).toEqual('save error');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
