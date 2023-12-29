import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FilePermissionDTO, UserPermissionDTO, UserPermissionEditDTO } from './admin.dto';

@Controller('/api/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('/file/rule/create')
    createNewFilePermission(@Body() permission: FilePermissionDTO) {
        return this.adminService.createNewFilePermission(permission);
    }

    @Get('/file/rules')
    filePermissions() {
        return this.adminService.filePermissions();
    }

    @Put('/file/rule/edit')
    updateFilePermission(@Body() permission: FilePermissionDTO) {
        return this.adminService.updateFilePermission(permission);
    }

    @Post('/user/rule/create')
    createNewUserPermission(@Body() users: UserPermissionDTO) {
        return this.adminService.createNewUserPermission(users);
    }

    @Get('/user/rules')
    userPermissions() {
        return this.adminService.userPermissions();
    }

    @Patch('/user/rule/edit')
    updateUserPermission(@Body() permission: UserPermissionEditDTO) {
        return this.adminService.updateUserPermission(permission);
    }

    @Delete('/file/:id')
    removeUploadedFile(@Param('id') id: string) {
        return this.adminService.removeUploadedFile(id);
    }
}
