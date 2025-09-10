
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly admins: AdminService,
        private readonly jwtService: JwtService,
    ) { }

    async loginAdmin(user: string, password: string): Promise<{ access_token: string }> {
        const admin = await this.admins.findByUser(user);

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: admin.id, user: admin.user, role: 'admin' };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
