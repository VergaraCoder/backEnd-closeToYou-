import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Contact } from './entities/contact.entity';
import { ManageError } from 'src/common/erros/custom/manageError';
import { OwnerService } from 'src/owner/owner.service';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private contactRepository:Repository<Contact>,
    private ownerService:OwnerService
  ){}

  async create(createContactDto: any) {
    try{     
      const createData=this.contactRepository.create(createContactDto);
      await this.contactRepository.save(createData);
      return createData;
    }catch(err:any){
      console.log("error created Contact", err );
      throw err;
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
      //console.log("error find All Contacts", err );
      throw ManageError.signedMessage(err.message);
    }
  }


  async findAllByOwnerId(id:number) {
    try{      
      const findContacts=await this.contactRepository.find({where:{idOwner:id}});
      const owner=await this.ownerService.findOne(id);
      console.log("THE DATA COMPLETE IS ");
      console.log([owner,...findContacts]);
      
      
      return [owner,...findContacts];
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
      console.log("error find one Contact", err );
      throw ManageError.signedMessage(err.message);
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    try{  
      const {affected} = await this.contactRepository.update(id,updateContactDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Updated Correctly";
    }catch(err:any){
      console.log("error updated Contact", err );
      throw ManageError.signedMessage(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected} = await this.contactRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE"
        });
      }
      return "Delete Perfectly";
    }catch(err:any){
      console.log("error delete Contact", err );
      throw ManageError.signedMessage(err.message);
    }
  }
}
