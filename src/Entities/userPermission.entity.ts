import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("UserPermissions")
export class UserPermissionsEntity {
    @PrimaryGeneratedColumn()
    rule_id: number;

    @Column()
    upload_disable: boolean;

    @ManyToOne(() => UserEntity, (user) => user.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id: UserEntity;
}
