import { Injectable } from '@nestjs/common';
import { MessageDTO, UserLoginDTO, UserProfile } from './user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from 'src/Entities/friend.entity';
import { FriendRequestEntity } from 'src/Entities/friendRequest.entity';
import { FileEntity } from 'src/Entities/file.entity';
import { MessageEntity } from 'src/Entities/message.entity';
import { NotificationEntity } from 'src/Entities/notification.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(FriendEntity) private friendRepo: Repository<FriendEntity>,
        @InjectRepository(FriendRequestEntity) private friendRequestRepo: Repository<FriendRequestEntity>,
        @InjectRepository(FileEntity) private fileRepo: Repository<FileEntity>,
        @InjectRepository(MessageEntity) private messageRepo: Repository<MessageEntity>,
        @InjectRepository(NotificationEntity) private notificationRepo: Repository<NotificationEntity>,
    ) { }

    async login(login: UserLoginDTO) {
        const user = await this.userRepo.findOneBy({
            user_name: login.username
        });

        if (user) {
            if (user.password == login.password) {
                return { isLogin: true, user: user };
            }
            else
                return { isLogin: false };
        }
    }

    allUsers() {
        return this.userRepo.find();
    }

    searchById(userId: number) {
        return this.userRepo.find({
            where: { user_id: userId }
        });
    }

    searchByUsername(username: string) {
        return this.userRepo.find({
            where: { user_name: username }
        });
    }

    async searchFromFriend(id: number, userId: number) {
        const friendCount = await this.friendRepo
            .createQueryBuilder('friends')
            .where('(friends.requested_user = :id AND friends.accepted_user = :userId) OR (friends.requested_user = :userId AND friends.accepted_user = :id)', { id, userId })
            .getCount();

        return friendCount > 0;
    }

    async searchFromCommunication(id: number, userId: number) {
        const conversation = await this.messageRepo
            .createQueryBuilder('messages')
            .where('(messages.sender_id = :id AND messages.reciever_id = :userId) OR (messages.sender_id = :userId AND messages.reciever_id = :id)', { id, userId })
            .getCount();

        return conversation > 0;
    }

    async createDraft(userId: number, messageObj: MessageDTO) {
        const sender = await this.userRepo.findOneBy({ user_id: userId });
        const receiver = await this.userRepo.findOneBy({ user_id: messageObj.receiverId });

        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }

        const draftMessage = new MessageEntity();
        draftMessage.message = messageObj.message;
        draftMessage.message_at = new Date().toISOString();
        draftMessage.status = "draft";
        draftMessage.sender_id = sender;
        draftMessage.receiver_id = receiver;

        const savedMessage = await this.messageRepo.save(draftMessage);
        return savedMessage;
    }

    async getDraft(userId: string, reciever: string) {
        const messages = await this.messageRepo
            .createQueryBuilder('messages')
            .where('(messages.sender_id = :userId AND messages.receiver_id = :reciever) OR (messages.sender_id = :reciever AND messages.receiver_id = :userId)', { userId, reciever })
            .getOne();

        return { draft: messages.message };
    }

    async allNotifications(userId: string) {
        const notification = await this.notificationRepo
            .createQueryBuilder('notifications')
            .where('notifications.user_id = :userId', { userId })
            .getMany();
        return notification;
    }

    async allFriends(userId: number) {
        const friends = await this.friendRepo
            .createQueryBuilder('friend')
            .leftJoinAndSelect('friend.requested_user', 'requestedUser')
            .leftJoinAndSelect('friend.accepted_user', 'acceptedUser')
            .where('requestedUser.user_id = :userId OR acceptedUser.user_id = :userId', { userId })
            .getMany();

        const friendUsers = friends.flatMap(friend => {
            return friend.requested_user.user_id == userId
                ? [friend.accepted_user] // Return the accepted_user as a friend
                : [friend.requested_user]; // Return the requested_user as a friend
        });

        return friendUsers;
    }

    async friendRequests(userId: number) {
        const friendRequests = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .leftJoinAndSelect('friendRequests.requested_user', 'requestedUser')
            .leftJoinAndSelect('friendRequests.received_user', 'receivedUser')
            .where("friendRequests.status = 'pending' AND receivedUser.user_id = :userId", { userId })
            .getMany();

        const friendUsers = friendRequests.flatMap(friend => {
            return friend.requested_user.user_id === userId
                ? [friend.received_user]
                : [friend.requested_user];
        });

        return friendUsers;
    }

    async requestSents(userId: number) {
        const friendRequests = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .leftJoinAndSelect('friendRequests.requested_user', 'requestedUser')
            .leftJoinAndSelect('friendRequests.received_user', 'receivedUser')
            .where("friendRequests.status = 'pending' AND requestedUser.user_id = :userId", { userId })
            .getMany();

        const friendUsers = friendRequests.flatMap(friend => {
            return friend.received_user.user_id === userId
                ? [friend.requested_user]
                : [friend.received_user];
        });

        return friendUsers;
    }

    async sendFriendRequest(userId: number, sentUser: { user: number }) {
        const user = await this.userRepo.findOneBy({ user_id: userId });
        const sent = await this.userRepo.findOneBy({ user_id: sentUser.user });
        if (!user || !sent) {
            return { message: 'Sender or receiver not found', status: 403 };
        }
        const sentId = sentUser.user;
        const friendCount = await this.friendRepo
            .createQueryBuilder('friends')
            .where('(friends.requested_user = :sentId AND friends.accepted_user = :userId) OR (friends.requested_user = :userId AND friends.accepted_user = :sentId)', { sentId, userId })
            .getCount();

        const friendRequestCount = await this.friendRequestRepo
            .createQueryBuilder('friendRequest')
            .where("(friendRequest.requested_user = :sentId AND friendRequest.received_user = :userId) OR (friendRequest.requested_user = :userId AND friendRequest.received_user = :sentId) AND (friendRequest.status = 'pending' OR friendRequest.status = 'friend')", { sentId, userId })
            .getCount();
        
        if (!(friendCount > 0) && !(friendRequestCount > 0)) {
            const friendRequest = new FriendRequestEntity();
            friendRequest.requested_user = user;
            friendRequest.received_user = sent;
            friendRequest.requested_at = new Date().toISOString();
            friendRequest.accepted_at = null;
            friendRequest.rejected_at = null;
            friendRequest.status = "pending";

            return this.friendRequestRepo.save(friendRequest);
        } else
            return { message: 'An error occured!', status: 403 };
    }

    async acceptFriendRequest(userId: number, sentUser: { user: number }) {
        const sentId = sentUser.user;
        const user = await this.userRepo.findOneBy({ user_id: userId });
        const sent = await this.userRepo.findOneBy({ user_id: sentUser.user });
        if (!user || !sent) {
            return { message: 'Sender or receiver not found', status: 403 };
        }
        const friendRequest = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .where("friendRequests.requested_user = :sentId AND friendRequests.received_user = :userId AND friendRequests.status = 'pending'", { userId, sentId })
            .getOne()
        if (friendRequest) {
            const friend = new FriendEntity();
            friend.requested_user = sent;
            friend.accepted_user = user;
            friend.added_at = new Date().toISOString();
            await this.friendRepo.save(friend);

            return this.friendRequestRepo.update(friendRequest.friend_id, {
                status: "friend",
                accepted_at: new Date().toISOString()
            })
        } else
            return { message: 'An error occured!', status: 403 };
    }

    async rejectFriendRequest(userId: number, sentUser: { user: number }) {
        const sentId = sentUser.user;
        const user = await this.userRepo.findOneBy({ user_id: userId });
        const sent = await this.userRepo.findOneBy({ user_id: sentUser.user });
        if (!user || !sent) {
            return { message: 'Sender or receiver not found', status: 403 };
        }
        const friendRequest = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .where("friendRequests.requested_user = :sentId AND friendRequests.received_user = :userId AND friendRequests.status = 'pending'", { userId, sentId })
            .getOne()
        if (friendRequest) {
            return this.friendRequestRepo.update(friendRequest.friend_id, {
                status: "rejected",
                rejected_at: new Date().toISOString()
            })
        } else
            return { message: 'An error occured!', status: 403 };
    }

    async cancelRequest(userId: number, sentUser: { user: number }) {
        const sentId = sentUser.user;
        const user = await this.userRepo.findOneBy({ user_id: userId });
        const sent = await this.userRepo.findOneBy({ user_id: sentUser.user });
        if (!user || !sent) {
            return { message: 'Sender or receiver not found', status: 403 };
        }
        const friendRequest = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .where("friendRequests.requested_user = :userId AND friendRequests.received_user = :sentId AND friendRequests.status = 'pending'", { userId, sentId })
            .getOne()
        if (friendRequest) {
            return this.friendRequestRepo.update(friendRequest.friend_id, {
                status: "cancel",
            })
        } else
            return { message: 'An error occured!', status: 403 };
    }

    async unfriend(userId: number, sentUser: { user: number }) {
        const friendId = sentUser.user;
        const user = await this.userRepo.findOneBy({ user_id: userId });
        const sent = await this.userRepo.findOneBy({ user_id: friendId });
        if (!user || !sent) {
            return { message: 'friend not found', status: 403 };
        }
        const friendRequest = await this.friendRequestRepo
            .createQueryBuilder('friendRequests')
            .where("(friendRequests.requested_user = :friendId AND friendRequests.received_user = :userId) OR (friendRequests.requested_user = :userId AND friendRequests.received_user = :friendId) AND friendRequests.status = 'friend'", { userId, friendId })
            .getOne()
        if (friendRequest) {
            const friend = await this.friendRepo
                .createQueryBuilder('friends')
                .where('(friends.requested_user = :userId AND friends.accepted_user = :friendId) OR (friends.requested_user = :friendId AND friends.accepted_user = :userId)', { userId, friendId })
                .getOne()

            this.friendRequestRepo.update(friendRequest.friend_id, {
                status: "unfriend",
                unfriend_at: new Date().toISOString()
            })

            return this.friendRepo.delete(friend);
        } else
            return { message: 'An error occured!', status: 403 };
    }
}
