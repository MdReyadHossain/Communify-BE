import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Notifications")
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    notification_id: number;

    @Column()
    type: string;

    @Column()
    notification: string;

    @Column()
    notification_at: string;

    @ManyToOne(() => UserEntity, (user) => user.user_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user_id: UserEntity;
}
