import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from '../orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, Auth],
})
export class AppModule {}
