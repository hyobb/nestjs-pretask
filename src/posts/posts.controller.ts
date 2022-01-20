import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
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
    return posts.map((post) => new ResponsePostDto(post));
  }

  @UseGuards(JwtAuthGaurd)
  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() postDto: UpdatePostDto,
  ) {
    return new ResponsePostDto(await this.postsService.update(id, user, postDto));
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@GetUser() user: User, @Body() postDto: CreatePostDto) {
    return new ResponsePostDto(await this.postsService.create(postDto, user));
  }


  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: User) {
    return this.postsService.delete(id, user);
  }
}
