import { Owner } from 'src/owner/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("contacts")
export class Contact {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    photoUri:string;

    @Column()
    telephone:string;

    @Column()
    idOwner:number;

    @ManyToOne(()=>Owner,owner=>owner.contact)
    owner:Owner;
}
