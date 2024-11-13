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
    try{
      const findContacts=await this.contactRepository.find();
      return findContacts;
    }catch(err:any){}
  }

  async findOne(id: number) {
    try{
      const findContact=await this.contactRepository.findOneBy({id});
      return findContact;
    }catch(err:any){}
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  async remove(id: number) {
    try{
      const {affected} = await this.contactRepository.delete(id);
      return "Delete Perfectly";
    }catch(err:any){}
  }
}
