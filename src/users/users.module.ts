import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CurrentUserMiddleware } from './../middlewares/current-user.middleware';




@Module({
  // connect user entity to the userModule
  imports : [TypeOrmModule.forFeature([User])],
  
controllers: [UsersController],
providers :[UsersService , AuthService]
  // providers: [UsersService , AuthService, {
  // to use globaly our CurrentUser interceptor
  //   provide : APP_INTERCEPTOR,
  //   useClass : CurrentUserInterceptor
  // }]
})
export class UsersModule {
  // implements global middlware 
  configure(consumer : MiddlewareConsumer ) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
