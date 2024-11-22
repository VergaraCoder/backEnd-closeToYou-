import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    telephone:string;

    @IsNotEmpty()
    @IsString()
    photoUri:string;

    @IsNotEmpty()
    @IsNumber()
    idOwner:number;
}

