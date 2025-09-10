// seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AdminService } from '../api/admin/admin.service';

@Module({
    providers: [SeederService, AdminService],
    exports: [SeederService],
})
export class SeederModule { }
