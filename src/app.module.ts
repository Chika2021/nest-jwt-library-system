import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
  }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    TaskModule,
    AuthModule,
  ],
   
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
