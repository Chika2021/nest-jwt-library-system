import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { BookDTO } from './dto/book.dto';
import { query } from 'express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private bookService:BookService){}

    @Get()
    @UseGuards(AuthGuard())
        async getAllBooks(@Query() query:ExpressQuery):Promise<Book[]>{
           return this.bookService.findAll(query) 
        }
    
  
    @Post()

        async createBook(@Body() book:BookDTO, @Req() req):Promise<Book>{
            return this.bookService.createBook(book, req.user)
        }

  
    @Get(':id')
        async findBookById(@Param('id') id:string):Promise<Book> {
            return this.bookService.findBookById(id)
        }

    @Put(':id')

        async updateBook(@Param('id') id:string,  @Body() book:BookDTO):Promise<Book>{
            return this.bookService.updateBook(id, book)
        }

 
    @Delete(':id')
        async deleteBook(@Param('id') id:string):Promise<Book> {
            return this.bookService.deleteBook(id)
        }
}
