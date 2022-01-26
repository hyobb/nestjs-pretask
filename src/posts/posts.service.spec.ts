import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import * as faker from '@faker-js/faker';
import { User } from '../users/entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { MockRepository } from '../libs/mocks/repository.type';
import { mockRepositoryConfig } from '../libs/mocks/repository.config';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CustomForbiddenException } from '../libs/exceptions/custom-forbidden.exception';

const mockPostRepository = mockRepositoryConfig;

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
    let user: User;

    describe('유저가 주어지지 않는다면', () => {
      it('UnauthorizedException 예외 발생', async () => {
        try {
          await service.create(createPostDto, user);
        } catch (e) {
          expect(e).toBeInstanceOf(UnauthorizedException);
        }
      });
    });

    describe('유저가 주어진다면', () => {
      user = User.factory();
      const savedPost = { ...createPostDto, user: user };

      it('Post 데이터를 생성한다', async () => {
        postRepository.save.mockResolvedValue(savedPost);
        const result = await service.create(createPostDto, user);

        expect(postRepository.save).toHaveBeenCalled();
        expect(postRepository.save).toHaveBeenCalledWith(savedPost);
        expect(result).toEqual(savedPost);
      });
    });
  });

  describe('findAll()', () => {
    const currentUser = User.factory();
    const existingPosts = [
      Post.factory({ user: currentUser }),
      Post.factory({ user: currentUser }),
    ];

    it('모든 Post 목록을 반환한다', async () => {
      postRepository.find.mockResolvedValue(existingPosts);
      const result = await service.findAll();

      expect(postRepository.find).toHaveBeenCalled();
      expect(result).toBe(existingPosts);
    });
  });

  describe('update()', () => {
    const updatePostDto: UpdatePostDto = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    };

    describe('게시글이 현재 유저의 것이 아니라면', () => {
      const existingPost = Post.factory();
      const currentUser = User.factory();

      it('ForbiddenException 예외 발생', async () => {
        const postRepositoryFindOneSpty = jest
          .spyOn(postRepository, 'findOneOrFail')
          .mockResolvedValue(existingPost);

        try {
          await service.update(existingPost.id, currentUser, updatePostDto);
        } catch (e) {
          expect(e).toBeInstanceOf(CustomForbiddenException);
        }

        expect(postRepository.findOneOrFail).toHaveBeenCalled();
        expect(postRepositoryFindOneSpty).toHaveBeenCalledWith({
          where: {
            id: existingPost.id,
          },
          relations: ['user'],
        });
      });
    });

    describe('게시글이 현재 유저가 작성한 글이라면', () => {
      const currentUser = User.factory();
      const existingPost = Post.factory({ user: currentUser });
      const updatedPost = Post.factory({
        params: {
          id: existingPost.id,
          ...updatePostDto,
        },
        user: currentUser,
      });

      it('성공적으로 Post 업데이트 함', async () => {
        jest
          .spyOn(postRepository, 'findOneOrFail')
          .mockResolvedValue(existingPost);

        jest.spyOn(postRepository, 'findOne').mockResolvedValue(updatedPost);

        jest.spyOn(postRepository, 'update').mockResolvedValue(updatedPost);

        const result = await service.update(
          existingPost.id,
          currentUser,
          updatePostDto,
        );

        expect(postRepository.update).toHaveBeenCalled();
        expect(result).toBe(updatedPost);
      });
    });
  });

  // describe('delete()', () => {
  //   describe('게시글이 존재하지 않는다면', () => {
  //     const existingPost = undefined;

  //     it('NotFoundException 발생', async () => {
  //       expect(NotFoundException).toHaveBeenCalled;
  //     });
  //   });
  //   describe('게시글이 한다면', () => {
  //     describe('게시글이 현재 유저의 것이 아니라면', () => {
  //   const existingPost = Post.factory({ withUser: true });
  //   const currentUser = User.factory();
  //   it('ForbiddenException 예외 발생', async () => {
  //     const postRepositoryFindOneSpty = jest
  //       .spyOn(postRepository, 'findOneOrFail')
  //       .mockResolvedValue(existingPost);
  //     try {
  //       await service.update(existingPost.id, currentUser, updatePostDto);
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(CustomForbiddenException);
  //     }
  //     expect(postRepository.findOneOrFail).toHaveBeenCalled();
  //     expect(postRepositoryFindOneSpty).toHaveBeenCalledWith({
  //       where: {
  //         id: existingPost.id,
  //       },
  //       relations: ['user'],
  //     });
  //   });
  // });
  // describe('게시글이 현재 유저가 작성한 글이라면', () => {
  //   const existingPost = Post.factory({ withUser: true });
  //   const currentUser = existingPost.user;
  //   const updatedPost = Post.factory({
  //     params: {
  //       id: existingPost.id,
  //       ...updatePostDto,
  //     },
  //   });
  //   it('성공적으로 Post 업데이트 함', async () => {
  //     jest
  //       .spyOn(postRepository, 'findOneOrFail')
  //       .mockResolvedValue(existingPost);
  //     jest
  //       .spyOn(postRepository, 'findOneOrFail')
  //       .mockResolvedValue(updatedPost);
  //     jest.spyOn(postRepository, 'update').mockResolvedValue(updatedPost);
  //     const result = await service.update(
  //       existingPost.id,
  //       currentUser,
  //       updatePostDto,
  //     );
  //     expect(postRepository.update).toHaveBeenCalled();
  //     expect(result).toBe(updatedPost);
  //   });
  //   });
  // });
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
