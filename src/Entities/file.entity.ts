import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Files")
export class FileEntity {
    @PrimaryGeneratedColumn()
    file_id: number;

    @Column()
    file_name: string;

    @Column()
    uploaded_at: string;

    @ManyToOne(() => UserEntity, (user) => user.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id: UserEntity;
}
