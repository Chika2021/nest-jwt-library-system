import { IsEmail, IsNotEmpty, IsString, MinLength, Validate, minLength } from "class-validator"



export class signUpDTO {
    @IsString()
    @IsNotEmpty()
    readonly name:string

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message: 'Please enter correct email'})    
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly password:string
}