import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name:'Book' , schema: BookSchema}]),
   
    ],
    controllers: [ BookController],
    providers: [BookService]
})
export class BookModule {}



