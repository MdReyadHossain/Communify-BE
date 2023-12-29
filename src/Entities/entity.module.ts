import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { MessageEntity } from './message.entity';
import { FriendRequestEntity } from './friendRequest.entity';
import { FileEntity } from './file.entity';
import { NotificationEntity } from './notification.entity';
import { UserPermissionsEntity } from './userPermission.entity';
import { FilePermissionsEntity } from './filePermission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, FriendEntity, FriendRequestEntity, FileEntity, NotificationEntity, UserPermissionsEntity, FilePermissionsEntity])],
})

export class MessageModule { }
