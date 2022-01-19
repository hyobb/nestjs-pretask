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
    @Req() req,
    @Body() postDto: UpdatePostDto,
  ) {
    const user = req.user;
    const post = await this.postsService.update(id, postDto, user);

    return post;
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@Req() req, @Body() postDto: CreatePostDto) {
    const user = req.user;
    const post = await this.postsService.create(postDto, user);
    return new ResponsePostDto(post);
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.postsService.delete(id, user);
  }
}
