import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from './signup.dto';
import { LogInDto } from './login.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {


    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService:JwtService) {}

    async signUp(signUpDTO:signUpDTO) {
        const {name, email, password} = signUpDTO

        const existingUser = await this.userModel.findOne({email})
        if(existingUser) {
            throw new Error('Email Already Exsists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = this.jwtService.sign({id: user._id})
        return {token}
    }
 

    async logIn(loginDTO:LogInDto):Promise<{token:string}> {

        const {email, password} = loginDTO;
        const user = await this.userModel.findOne({email})
        if(!user) {
            throw new UnauthorizedException('Invalid Email And Password')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Password Did Not Match')
        }

        const token = this.jwtService.sign({id:user._id})
        return {token}

    }

    

}
