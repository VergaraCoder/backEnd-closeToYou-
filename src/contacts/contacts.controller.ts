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
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }

  @Get()
  @UseGuards(jwtGuard)
  async findAll() {
    return await this.contactsService.findAll();
  }

  @Get(':id')
  @UseGuards(jwtGuard)
  async findOne(@Param('id') id: string) {
    return await this.contactsService.findOne(+id);
  }


  @Get('owner')
  @UseGuards(jwtGuard)
  async findOneByOwner( @Req() request:Request) {
    const dataRequest:any=request["user"];

    if(request["refresh_token"]){
      
      const contacts=await this.contactsService.findAllByOwnerId(dataRequest.id);
      return {refresh_token:request["refresh_token"],contacts};
    }
    return await this.contactsService.findOne(dataRequest.id);
  }

  @Patch(':id')
  @UseGuards(jwtGuard)
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return await this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @UseGuards(jwtGuard)
  async remove(@Param('id') id: string) {
    return await this.contactsService.remove(+id);
  }
}
