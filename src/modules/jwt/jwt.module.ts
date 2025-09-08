import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { jwtConstants } from './jwt.constants';

@Global()
@Module({
    imports: [
        NestJwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
    ],
    providers: [JwtAuthGuard],
    exports: [NestJwtModule, JwtAuthGuard],
})
export class JwtModule { }


