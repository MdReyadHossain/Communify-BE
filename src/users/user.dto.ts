import { IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
    @IsNotEmpty({ message: "Username should not be empty!" })
    username: string;

    @IsNotEmpty({ message: "Password should not be empty!" })
    password: string
}

export class UserProfile {
    name: string
}

export class MessageDTO {
    @IsNotEmpty({ message: "Received Id should not be empty!" })
    receiverId: number;

    @IsNotEmpty({ message: "message should not be empty!" })
    message: string;
}