import { IsNotEmpty } from "class-validator";

interface User {
    userId: number
}

export class UserPermissionEditDTO {
    @IsNotEmpty({ message: "User Id should not be empty!" })
    userId: number;

    @IsNotEmpty({ message: "Upload Permission should not be empty!" })
    uploadDisable: boolean;
}

export class UserPermissionDTO {
    users: User[];
}

export class FilePermissionDTO {
    filePermissionId: number;

    @IsNotEmpty({ message: "Type should not be empty!" })
    type: string;

    @IsNotEmpty({ message: "Size should not be empty!" })
    size: string;
}