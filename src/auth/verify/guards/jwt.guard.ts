import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import * as webToken from 'jsonwebtoken';
import { ManageError } from "src/common/erros/custom/manageError";

@Injectable()
export class jwtGuard implements CanActivate{

    constructor(
        private authService:AuthService,
        private jwtService:JwtService
    ){}

    async canActivate(context: ExecutionContext):Promise<any> {
        
        const request:Request= context.switchToHttp().getRequest();
        const token1=request.headers["refresh_token"] as string | undefined; 
        const token2=request.headers["access_token"] as string | undefined; 
        try{    
            console.log("the tokens are ");
            
            console.log(token1);
            console.log(token2);
                 
            
            if(!token1 || !token2){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"YOU MUST PROVIDER A TOKEN"
                });
            }

            await this.jwtService.verify(token1);
            const tokenDecode= await this.jwtService.decode(token1);
            request["user"]= tokenDecode;
            console.log("PASSS");
            
            return true;

        }catch(err:any){

            if(err instanceof webToken.TokenExpiredError){
                const tokens:any=await this.authService.renovateToken(token2);

                const decode= await this.jwtService.decode(tokens.refresh_token);

                request["user"]=decode;

                request["refresh_token"]=tokens.refresh_token;

                request["access_token"]=tokens.refresh_token;

                return true;
            }
        }
    }
}