import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Contact } from "src/contacts/entities/contact.entity";
import { Owner } from "src/owner/entities/owner.entity";


@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        console.log('DB Host:', this.configService.get<string>('DB_HOST'));
        console.log('DB Port:', this.configService.get<number>('DB_PORT'));
        console.log('DB Username:', this.configService.get<string>('DB_USERNAME'));
        console.log('DB Database:', this.configService.get<string>('DB_DATABASE'));
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
              Contact,Owner
            ],
            synchronize: true,
            driver: require('mysql2'),
        });
    }
}