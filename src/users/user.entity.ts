import { FileEntity } from "src/Entities/file.entity";
import { FriendEntity } from "src/Entities/friend.entity";
import { FriendRequestEntity } from "src/Entities/friendRequest.entity";
import { MessageEntity } from "src/Entities/message.entity";
import { NotificationEntity } from "src/Entities/notification.entity";
import { UserPermissionsEntity } from "src/Entities/userPermission.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    user_name: string;

    @Column()
    email: string;

    @Column()
    number: string;

    @Column()
    password: string;

    @Column()
    registration_at: string;

    @OneToMany(() => MessageEntity, (sender) => sender.sender_id, { onDelete: "CASCADE" })
    sender: MessageEntity[];

    @OneToMany(() => MessageEntity, (receiver) => receiver.receiver_id, { onDelete: "CASCADE" })
    receiver: MessageEntity[];

    @OneToMany(() => FriendEntity, (requested) => requested.requested_user, { onDelete: "CASCADE" })
    requested: FriendEntity[];

    @OneToMany(() => FriendEntity, (accepted) => accepted.accepted_user, { onDelete: "CASCADE" })
    accepted: FriendEntity[];

    @OneToMany(() => NotificationEntity, (user) => user.user_id, { onDelete: "CASCADE" })
    user: NotificationEntity[];

    @OneToMany(() => FriendRequestEntity, (sender) => sender.requested_user, { onDelete: "CASCADE" })
    requester: FriendRequestEntity[];

    @OneToMany(() => FriendRequestEntity, (receiverReq) => receiverReq.received_user, { onDelete: "CASCADE" })
    receiverReq: FriendRequestEntity[];

    @OneToMany(() => FileEntity, (file) => file.user_id, { onDelete: "CASCADE" })
    file: FileEntity[];

    @OneToMany(() => UserPermissionsEntity, (userPermission) => userPermission.user_id, { onDelete: "CASCADE" })
    userPermission: UserPermissionsEntity[];
}
