import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../core/corePrisma/prisma.service';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) { }

    async createAdmin(dto: CreateAdminDto) {
        const existingCount = await (this.prisma as any).admin.count();
        if (existingCount > 0) {
            throw new ForbiddenException('Admin already exists');
        }

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

        return (this.prisma as any).admin.create({
            data: {
                user: dto.user,
                password: hashedPassword,
            },
        });
    }

    async findByUser(user: string) {
        return (this.prisma as any).admin.findUnique({ where: { user } });
    }

    async findById(id: string) {
        return (this.prisma as any).admin.findUnique({ where: { id } });
    }

    async countAdmins(): Promise<number> {
        return (this.prisma as any).admin.count();
    }
}
