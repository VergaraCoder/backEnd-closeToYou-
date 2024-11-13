import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private contactRepository:Repository<Contact>
  ){}

  async create(createContactDto: CreateContactDto) {
    try{
      const createData=this.contactRepository.create(createContactDto);
      return createData;
    }catch(err:any){

    }
  }

  async findAll() {
    return `This action returns all contacts`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  async remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
