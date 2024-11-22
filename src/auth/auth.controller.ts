import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalGuard } from './verify/guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  create(@Body() createAuthDto: CreateAuthDto,@Req() request:Request) {
    const requ=request["user"];
    return this.authService.createToken(requ);
  }
}
