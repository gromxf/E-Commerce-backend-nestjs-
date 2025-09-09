import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
@Injectable()
export class SeederService {
    constructor(private readonly adminService: AdminService) { }

    async seed() {
        const adminUser = process.env.INIT_ADMIN_USER;
        const adminPassword = process.env.INIT_ADMIN_PASSWORD;
        if (adminUser && adminPassword) {
            const count = await this.adminService.countAdmins();
            if (count === 0) {
                await this.adminService.createAdmin({ user: adminUser, password: adminPassword });
                console.log('Seeded initial admin');
            }
        }
    }
}
