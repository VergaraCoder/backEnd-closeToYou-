import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { OwnerService } from "src/owner/owner.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    constructor(
        private ownerService:OwnerService,
    ){
        super({
            usernameField:"email",passwordField:"password"
        });
    }


    async validate(email:string,password:string){
        try{
            console.log("enter verify data");
            
            const owner=await this.ownerService.findOneByEmailPassword({email,password});

            const payload={
                id:owner.id,
                email:owner.email
            }
            return payload;

        }catch(err:any){
            throw err;
        }
    }

}