import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import webToken from 'jsonwebtoken';
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
            
            if(!token1 || !token2){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"YOU MUST PROVIDER A TOKEN"
                });
            }

            await this.jwtService.verify(token1);
            return true;

        }catch(err:any){
            if(err instanceof webToken.TokenExpiredError){
                const {refresh_token}=await this.authService.renovateToken(token2);
                return {refresh_token}
            }
        }
    }
}