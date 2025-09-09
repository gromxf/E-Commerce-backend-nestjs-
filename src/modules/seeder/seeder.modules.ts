// seeder.module.ts
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AdminService } from '../admin/admin.service';

@Module({
    providers: [SeederService, AdminService],
    exports: [SeederService],
})
export class SeederModule { }
