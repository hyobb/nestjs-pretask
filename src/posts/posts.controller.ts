import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../libs/decorators/get-user.decorator';
import { BaseResponseDto } from '../libs/dtos/base-response.dto';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { ResponsePostDto } from './dtos/response-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();

    return BaseResponseDto.OK_WITH(
      posts.map((post) => new ResponsePostDto(post)),
    );
  }

  @UseGuards(JwtAuthGaurd)
  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() postDto: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, user, postDto);

    return BaseResponseDto.OK_WITH(new ResponsePostDto(post));
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@GetUser() user: User, @Body() postDto: CreatePostDto) {
    const post = await this.postsService.create(postDto, user);

    return BaseResponseDto.CREATED_WITH(new ResponsePostDto(post));
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: User) {
    this.postsService.delete(id, user);

    return BaseResponseDto.OK('삭제되었습니다.');
  }
}
