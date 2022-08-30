import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule , ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session')
const dbConfig = require('../ormconfig.js');





@Module({
  imports: [
    //CONFIG
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    // DB config with env configuration stuff: we moov it to ormconfig.js file
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory : (config : ConfigService) => {
    //     return {
    //       type : 'sqlite',
    //       database : config.get<string>('DB_NAME'),
    //       synchronize : true,
    //       entities : [User,Report]
    //     }
    //   }
    // }),
    // DB connection before env configuration stuff
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User , Report],
      //dev env only : allow us to synchonize changment (migration) when we change any structure of our entities
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide : APP_PIPE,
      // whitelist : true allow us to ignore an extra property we can add on the incomming request in the validation
      useValue : new ValidationPipe({ whitelist: true }) 
    }
  ],
})
export class AppModule {

  constructor(private configService : ConfigService){}


  configure(consumer : MiddlewareConsumer){
      consumer.apply(cookieSession({keys : [this.configService.get('COOKIE_KEY')]})).forRoutes('*')
  }
}
