import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalGuard } from './verify/guards/local.guard';
import { jwtGuard } from './verify/guards/jwt.guard';
import { OwnerModule } from 'src/owner/owner.module';
import { LocalStrategy } from './verify/strategy/local.strategy';

@Module({
  imports:[
    PassportModule,
    OwnerModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],  
      useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>("JWT_SECRET") ,
      })
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    LocalGuard,
    LocalStrategy,
    jwtGuard,
    JwtModule
  ],
  exports:[
    AuthService,
    JwtModule,
    LocalGuard,
    jwtGuard
  ]
})
export class AuthModule {}
