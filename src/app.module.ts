import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { ErrorsModule } from './errors/errors.module';


@Module({
  imports: [ContactsModule, ErrorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
