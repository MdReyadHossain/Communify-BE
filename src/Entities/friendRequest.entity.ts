import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("FriendRequests")
export class FriendRequestEntity {
    @PrimaryGeneratedColumn()
    friend_id: number;

    @Column()
    requested_at: string;

    @Column({ nullable: true })
    accepted_at: string;

    @Column({ nullable: true })
    rejected_at: string;

    @Column({ nullable: true })
    unfriend_at: string;

    @Column()
    status: string;

    @ManyToOne(() => UserEntity, (sender) => sender.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'requested_user' })
    requested_user: UserEntity;

    @ManyToOne(() => UserEntity, (receiver) => receiver.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'received_user' })
    received_user: UserEntity;
}
