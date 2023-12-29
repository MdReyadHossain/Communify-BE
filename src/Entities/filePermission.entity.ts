import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("FilePermissions")
export class FilePermissionsEntity {
    @PrimaryGeneratedColumn()
    rule_id: number;

    @Column()
    type: string;

    @Column()
    size: number;
}
