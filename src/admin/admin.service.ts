import { Injectable } from '@nestjs/common';
import { FilePermissionDTO, UserPermissionDTO, UserPermissionEditDTO } from './admin.dto';

@Injectable()
export class AdminService {
    createNewFilePermission(permission: FilePermissionDTO) {
        throw new Error('Method not implemented.');
    }
    
    filePermissions() {
        throw new Error('Method not implemented.');
    }

    updateFilePermission(permission: FilePermissionDTO) {
        throw new Error('Method not implemented.');
    }

    createNewUserPermission(users: UserPermissionDTO) {
        throw new Error('Method not implemented.');
    }

    userPermissions() {
        throw new Error('Method not implemented.');
    }

    updateUserPermission(permission: UserPermissionEditDTO) {
        throw new Error('Method not implemented.');
    }

    removeUploadedFile(id: string) {
        throw new Error('Method not implemented.');
    }
}
