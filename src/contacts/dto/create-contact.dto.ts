import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsNumber()
    telephone:number;

    @IsNotEmpty()
    @IsString()
    photoUri:string;

    @IsOptional()
    idOwner:number;
}

