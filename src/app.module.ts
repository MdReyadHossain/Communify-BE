import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { MessageEntity } from './Entities/message.entity';
import { MessageModule } from './Entities/entity.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        UsersModule,
        MessageModule,
        TypeOrmModule.forRoot({
            // type: 'postgres',
            // host: 'satao.db.elephantsql.com',
            // port: 5432,
            // username: 'zstnnmsu',
            // password: 'U_OP-727SHwzfCwxVnwQBvspwkwvQj8w',
            // database: 'zstnnmsu',
            // autoLoadEntities: true,
            // synchronize: true,

            //-----------x------------\\

            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'postgres',
            database: 'Communify',
            autoLoadEntities: true,
            synchronize: true,
        }),
        AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
