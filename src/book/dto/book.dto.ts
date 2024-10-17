import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schema/book.schema"
import { User } from "src/auth/schema/user.schema"


export class BookDTO {
    @IsNotEmpty()
    @IsString()
        readonly title:string
    
    @IsNotEmpty()
    @IsString()
        readonly description:string
    
    @IsNotEmpty()
    @IsString()
        readonly author:string
    
    @IsNotEmpty()
    @IsNumber()
        readonly price:number
    readonly category:Category

    @IsEmpty({message: 'You cannot pass user Id'})
    readonly user:User

}