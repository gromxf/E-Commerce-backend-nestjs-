import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/corePrisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.password,
            },
        });
    }
}
