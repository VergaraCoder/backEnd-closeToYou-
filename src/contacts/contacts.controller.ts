import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { jwtGuard } from 'src/auth/verify/guards/jwt.guard';
import { Request } from 'express';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(jwtGuard)
  async create(@Body() createContactDto: CreateContactDto, @Req() request:Request) {
    const reque:any= request["user"];
    console.log(request.body);
    console.log(createContactDto);
    
    
    return await this.contactsService.create({idOwner:reque.id,...createContactDto});
  }

  @Get()
  @UseGuards(jwtGuard)
  async findAll() {
    return await this.contactsService.findAll();
  }

  @Get('owner')
  @UseGuards(jwtGuard)
  async findOneByOwner( @Req() request:Request) {
    
    const dataRequest:any=request["user"];
    console.log(dataRequest);
    
    if(request["refresh_token"]){

      const contacts=await this.contactsService.findAllByOwnerId(dataRequest.id);
      return {refresh_token:request["refresh_token"],contacts};
    }
    
    return await this.contactsService.findAllByOwnerId(dataRequest.id);
  }

  @Get(":id")
  @UseGuards(jwtGuard)
  async findOne(@Param() id:string,@Req() request:Request) {
    const dataRequest:any=request["user"];
    return await this.contactsService.findOne(+id);
  }


  @Patch(":id")
  @UseGuards(jwtGuard)
  async update(@Param() id:string,@Body() updateContactDto: UpdateContactDto,@Req() request:Request) {
    const dataRequest:any=request["user"];
    return await this.contactsService.update(+id, updateContactDto);
  }

  @Delete(":id")
  @UseGuards(jwtGuard)
  async remove(@Param() id:string, @Req() request:Request) {
    const dataRequest:any=request["user"];
    return await this.contactsService.remove(+id);
  }
}
