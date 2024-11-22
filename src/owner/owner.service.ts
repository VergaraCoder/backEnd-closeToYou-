import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageError } from 'src/common/erros/custom/manageError';


interface verifyUser{
  email:string;
  password:string;
}

@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner)
    private ownerRepository:Repository<Owner>
  ){}

  async create(createOwnerDto: CreateOwnerDto) {
    try{
      console.log("enramos a crear user");
      const createData=this.ownerRepository.create(createOwnerDto);
      await this.ownerRepository.save(createData);
      return createData;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const users:Owner[]=await this.ownerRepository.find();

      if(users.length=0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"INCORRECT CREDENCTIALS"
        });
      }

      return users;

    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async findOneByEmailPassword(data:verifyUser){
    try{
      const user:Owner=await this.ownerRepository.findOne({
        where:{
          email:data.email,
          password:data.password
        }
      });

      if(!user){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"INCORRECT CREDENCTIALS"
        });
      }

      return user;

    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const user:Owner=await this.ownerRepository.findOneBy({
        id
      });
      if(!user){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"INCORRECT CREDENCTIALS"
        });
      }
      return user;
    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    try{
      const {affected}=await this.ownerRepository.update(id,updateOwnerDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"INCORRECT CREDENCTIALS"
        });
      }
      return true;
    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.ownerRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"INCORRECT CREDENCTIALS"
        });
      }
      return true;
    }catch(err:any){
      throw ManageError.signedMessage(err.message);
    }
  }
}
