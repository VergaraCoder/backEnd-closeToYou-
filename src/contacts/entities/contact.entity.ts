import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    telephone:number;

    // @Column()
    // idOwner:number;
}
