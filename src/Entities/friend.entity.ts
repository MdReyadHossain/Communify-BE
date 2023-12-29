import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Friends")
export class FriendEntity {
    @PrimaryGeneratedColumn()
    friend_id: number;

    @Column()
    added_at: string;

    @ManyToOne(() => UserEntity, (sender) => sender.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'requested_user' })
    requested_user: UserEntity;

    @ManyToOne(() => UserEntity, (reciever) => reciever.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'accepted_user' })
    accepted_user: UserEntity;
}
