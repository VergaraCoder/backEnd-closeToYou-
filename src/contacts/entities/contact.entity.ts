import { Column, Entity } from 'typeorm';

@Entity("contacts")
export class Contact {
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
