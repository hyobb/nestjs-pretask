import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from '../orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, Auth],
})
export class AppModule {}
