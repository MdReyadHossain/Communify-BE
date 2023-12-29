import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FriendEntity } from 'src/Entities/friend.entity';
import { FriendRequestEntity } from 'src/Entities/friendRequest.entity';
import { FileEntity } from 'src/Entities/file.entity';
import { MessageEntity } from 'src/Entities/message.entity';
import { NotificationEntity } from 'src/Entities/notification.entity';
import { UserPermissionsEntity } from 'src/Entities/userPermission.entity';
import { FilePermissionsEntity } from 'src/Entities/filePermission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FriendEntity, FriendRequestEntity, FileEntity, MessageEntity, NotificationEntity, UserPermissionsEntity, FilePermissionsEntity])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
