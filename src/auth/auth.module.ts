import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalGuard } from './verify/guards/local.guard';
import { jwtGuard } from './verify/guards/jwt.guard';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],  
      useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>("SECRET_JWT") ,
      })
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalGuard,
    jwtGuard,
    JwtModule
  ],
  exports:[
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
