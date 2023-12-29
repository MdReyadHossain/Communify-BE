import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "http://localhost:4430",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    });
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'secret',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: null
            }
        })
    );
    await app.listen(3000);
}
bootstrap();
