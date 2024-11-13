import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Contact } from './entities/contact.entity';
import { ManageError } from 'src/common/erros/custom/manageError';

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
      if(findContacts.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT REGISTER YET"
        });
      }
      return findContacts;
    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const findContact=await this.contactRepository.findOneBy({id});
      if(!findContact){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"DOES NOT REGISTER WITH THIS ID"
        });
      }
      return findContact;
    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    try{  
      const {affected} = await this.contactRepository.update(id,updateContactDto);
      return "Updated Correctly";
    }catch(err:any){}
  }

  async remove(id: number) {
    try{
      const {affected} = await this.contactRepository.delete(id);
      return "Delete Perfectly";
    }catch(err:any){}
  }
}
