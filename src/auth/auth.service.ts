import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import jsonToken from 'jsonwebtoken';
import { ManageError } from 'src/common/erros/custom/manageError';

@Injectable()
export class AuthService {
  
  constructor(
    private jwtService:JwtService
  ){}

  async createToken(createAuthDto: any) {
    return{
      access_token:this.jwtService.sign(createAuthDto,{expiresIn:'2h'}),
      refresh_token:this.jwtService.sign(createAuthDto,{expiresIn:'20d'})
    }
  }

  async renovateToken(refreshToken:string) {
    try{
      
      await this.jwtService.verify(refreshToken);

      const decodeToken=await this.jwtService.decode(refreshToken);

      const refresh_token:string=this.jwtService.sign(decodeToken);

      return {refresh_token};

    }catch(err:any){
      if(err instanceof jsonToken.JsonWebTokenError){
        throw new ManageError({
          type:"UNAUTHORIZED",
          message:"YOU MUST PROVIDER THE TOKENS"
        });
      }
      else if(err instanceof jsonToken.JsonWebTokenError || err instanceof jsonToken.TokenExpiredError){
        throw new ManageError({
          type:"UNAUTHORIZED",
          message:"THE TOKEN EXPIRED"
        });
      }
      throw ManageError.signedMessage(err.message);
    }
  }
}
