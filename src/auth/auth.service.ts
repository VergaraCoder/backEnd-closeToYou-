import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as jsonToken from 'jsonwebtoken';
import { ManageError } from 'src/common/erros/custom/manageError';

@Injectable()
export class AuthService {
  
  constructor(
    private jwtService:JwtService
  ){}

  async createToken(createAuthDto: any) {
    return{
      access_token:this.jwtService.sign(createAuthDto,{expiresIn:'4h'}),
      refresh_token:this.jwtService.sign(createAuthDto,{expiresIn:'30d'})
    }
  }

  async renovateToken(refreshToken:string) {
    const decodeToken=await this.jwtService.decode(refreshToken);
    try{
      delete decodeToken.iat;
      delete decodeToken.exp;
      
      await this.jwtService.verify(refreshToken);
      
      const access_token:string=this.jwtService.sign(decodeToken,{expiresIn:'4h'});

      const refresh_token:string=this.jwtService.sign(decodeToken,{expiresIn:'30d'});

      return {refresh_token,access_token};

    }catch(err:any){
      
      if(err instanceof jsonToken.JsonWebTokenError && err.message !== "jwt expired"){    
        throw new ManageError({
          type:"UNAUTHORIZED",
          message:"THE TOKEN MUST BE PROVIDER"
        });
      }
      if(err instanceof jsonToken.TokenExpiredError || err.message == "jwt expired"){
        
        const access_token:string=this.jwtService.sign(decodeToken,{expiresIn:'4h'});

        const refresh_token:string=this.jwtService.sign(decodeToken,{expiresIn:'20d'});
  
        return {refresh_token,access_token};
      }
      //throw ManageError.signedMessage(err.message);
    }
  }
}
