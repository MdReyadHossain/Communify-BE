import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Admin")
export class AdminEntity {
    @PrimaryGeneratedColumn()
    admin_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
