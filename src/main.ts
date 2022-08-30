import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// whitelist : true allow us to ignore an extra property we can add on the incomming request in the validation
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // We moove thes 2 lines in app.modules to make our integation session work
  // app.use(cookieSession({keys : ['cookiestorekeys']}))
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
