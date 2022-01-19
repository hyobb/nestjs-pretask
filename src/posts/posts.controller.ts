import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { ResponsePostDto } from './dtos/response-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    console.log(posts);
    return posts.map((post) => new ResponsePostDto(post));
  }

  @UseGuards(JwtAuthGaurd)
  @Patch('/:id')
  async patch(
    @Param('id') postId: number,
    @Req() req,
    @Body() postDto: UpdatePostDto,
  ) {
    const user = req.user;
    const post = await this.postsService.update(postId, postDto, user);

    return post;
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@Req() req, @Body() postDto: CreatePostDto) {
    const user = req.user;
    const post = await this.postsService.create(postDto, user);
    return new ResponsePostDto(post);
  }

  // @UseGuards(JwtAuthGaurd)

}
