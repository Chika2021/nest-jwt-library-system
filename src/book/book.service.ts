import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { BookDTO } from './dto/book.dto';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel:mongoose.Model<Book>
    ) {}

    async findAll(query:Query):Promise<Book[]> {

        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)
    
        const keyword = query.keyword ? {
            title: {
                $rgex:query.keyword,
                $options: 'i'
            }
        } : {}

        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return books;
    }
    async createBook(book:Book, user:User) {
        const data = Object.assign(book, {user:user._id})
        const res = await this.bookModel.create(data)
        return res
    }
    async findBookById(id:string) {
        const found = await this.bookModel.findById(id)
        if(!found) {
            throw new NotFoundException('Book Not Found')
        }
        return found
    }

    async updateBook(id:string, book:BookDTO) {
        const updated = await this.bookModel.findByIdAndUpdate(id, book, {new:true, runValidators:true})
        return updated;

    }

    async deleteBook(id:string){
        return await this.bookModel.findByIdAndDelete(id)
       
    }
}
