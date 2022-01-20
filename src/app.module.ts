import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './global/configs/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comments/comments.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfig } from './global/configs/pino-logger.config';

@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfig),
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
