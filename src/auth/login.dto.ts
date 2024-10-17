import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LogInDto {

    @IsNotEmpty()
    @IsEmail({}, {message:'Please Enter Correct Email'})
    readonly email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    readonly password:string


}