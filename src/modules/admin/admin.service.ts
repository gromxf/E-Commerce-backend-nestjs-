import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/corePrisma/prisma.service';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) { }

    async createAdmin(dto: CreateAdminDto) {
        return (this.prisma as any).admin.create({
            data: {
                user: dto.user,
                password: dto.password,
            },
        });
    }

    async findByUser(user: string) {
        return (this.prisma as any).admin.findUnique({ where: { user } });
    }

    async findById(id: string) {
        return (this.prisma as any).admin.findUnique({ where: { id } });
    }
}
