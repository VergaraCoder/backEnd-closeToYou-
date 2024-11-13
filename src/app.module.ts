import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './common/db/dbConfig';


@Module({
  imports:[
  ContactsModule,
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:".env"
  }),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useClass:Credentials,
  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}
