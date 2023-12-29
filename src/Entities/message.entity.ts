import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Messages")
export class MessageEntity {
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    message: string;

    @Column()
    status: string;

    @Column()
    message_at: string;

    @ManyToOne(() => UserEntity, (sender) => sender.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sender_id' })
    sender_id: UserEntity;

    @ManyToOne(() => UserEntity, (reciever) => reciever.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'reciever_id' })
    receiver_id: UserEntity;
}
