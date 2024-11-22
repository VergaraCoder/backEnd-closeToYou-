import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Contact]),
    AuthModule,
    OwnerModule
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports:[
  ]
})
export class ContactsModule {}
