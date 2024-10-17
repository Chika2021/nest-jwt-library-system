import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schema/book.schema"


export class UpdateBookDTO {
    @IsOptional()
    @IsString()
        readonly title:string
    
   @IsOptional()
    @IsString()
        readonly description:string
    
    @IsOptional()
    @IsString()
        readonly author:string
    
    @IsOptional()
    @IsNumber()
        readonly price:number
    readonly category:Category

}