import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Session, Res, UsePipes, ValidationPipe, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessageDTO, UserLoginDTO, UserProfile } from './user.dto';
import { UserSessionGuard } from './session.guard';

@Controller('/api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Session() session,
        @Body() login: UserLoginDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = await this.usersService.login(login);
        try {
            if (user.isLogin) {
                session.userId = user.user.user_id;
                session.username = user.user.user_name;
                return { session, message: "Login Successfull!", success: true, user: user }
            } else {
                return { message: "Username or Password incorrect", success: false }
            }
        } catch {
            return { message: "Username or Password incorrect...", success: false }
        }

    }

    // --------------Search User[start]--------------------\\

    @Get()
    async allUsers() {
        return this.usersService.allUsers();
    }

    @Get('/all/search/:userId')
    async searchById(@Param('userId') userId: number) {
        return this.usersService.searchById(userId);
    }

    @Get('/all/searchbyusername/:username')
    searchByUsername(@Param('username') username: string) {
        return this.usersService.searchByUsername(username);
    }

    @Get('/friend/search/:userId')
    // @UseGuards(UserSessionGuard)
    searchFromFriend(
        @Session() session,
        @Param('userId') userId: number,
    ) {
        return this.usersService.searchFromFriend(session.userId, userId);
    }

    @Get('/conversation/search/:userId')
    // @UseGuards(UserSessionGuard)
    searchFromCommunication(
        @Param('userId') userId: number,
        @Session() session,
    ) {
        return this.usersService.searchFromCommunication(session.userId, userId);
    }

    // --------------Search User[end]--------------------\\



    // --------------Draft Message[start]--------------------\\

    @Post('/conversation/draft')
    // @UseGuards(UserSessionGuard)
    createDraft(
        @Body() message: MessageDTO,
        @Session() session,
    ) {
        return this.usersService.createDraft(session.userId, message);
    }

    @Get('/conversation/draft/:reciever')
    // @UseGuards(UserSessionGuard)
    getDraft(
        @Param('reciever') reciever: string,
        @Session() session,
    ) {
        return this.usersService.getDraft(session.userId, reciever);
    }

    // --------------Draft Message[end]--------------------\\



    // --------------Notification[start]--------------------\\

    @Get('/notificatoins/:id')
    // @UseGuards(UserSessionGuard)
    allNotifications(
        @Param('id') id: string,
        @Session() session
    ) {
        return this.usersService.allNotifications(id);
    }

    // --------------Notification[end]--------------------\\



    // --------------Friends[Start]--------------------\\

    @Get('/friends/:id')
    // @UseGuards(UserSessionGuard)
    allFriends(@Param('id') id: number, @Session() session) {
        return this.usersService.allFriends(id);
    }

    @Get('/friend/requests/:id')
    // @UseGuards(UserSessionGuard)
    friendRequests(@Param('id') id: number, @Session() session) {
        return this.usersService.friendRequests(id);
    }

    @Get('/friend/request/sents/:id')
    // @UseGuards(UserSessionGuard)
    requestSents(@Param('id') id: number, @Session() session) {
        return this.usersService.requestSents(id);
    }

    @Post('/friend/send/:id')
    // @UseGuards(UserSessionGuard)
    sendFriendRequest(
        @Param('id') id: number,
        @Body() sentUser: { user: number },
        @Session() session
    ) {
        return this.usersService.sendFriendRequest(id, sentUser);
    }

    @Put('/friend/accept/:id')
    // @UseGuards(UserSessionGuard)
    acceptFriendRequest(
        @Param('id') id: number,
        @Body() sentUser: { user: number },
        @Session() session
    ) {
        return this.usersService.acceptFriendRequest(id, sentUser);
    }

    @Patch('/friend/reject/:id')
    // @UseGuards(UserSessionGuard)
    rejectFriendRequest(
        @Param('id') id: number,
        @Body() sentUser: { user: number },
        @Session() session
    ) {
        return this.usersService.rejectFriendRequest(id, sentUser);
    }

    @Patch('/friend/request/cancel/:id')
    // @UseGuards(UserSessionGuard)
    cancelRequest(
        @Param('id') id: number,
        @Body() sentUser: { user: number },
        @Session() session
    ) {
        return this.usersService.cancelRequest(id, sentUser);
    }

    @Delete('/friend/unfriend/:id')
    unfriend(
        @Param('id') id: number,
        @Body() sentUser: { user: number },
        @Session() session
    ) {
        return this.usersService.unfriend(id, sentUser);
    }

    // --------------Friends[end]--------------------\\
}
