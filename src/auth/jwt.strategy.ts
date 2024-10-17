import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { ExtractJwt } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectModel(User.name) private userModel:Model<User>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload:any){
        const {id} = payload
        const user = await this.userModel.findById(id)
        if(!user) {
            throw new UnauthorizedException('Please Login first')
        }
        return user
    }

}