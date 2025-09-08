import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(AuthGuard)
  @Get('dashboard')
  getDashboard() {
    return { message: 'Admin dashboard', at: new Date().toISOString() };
  }

  @UseGuards(AuthGuard)
  @Get('data')
  getProtectedData() {
    return { stats: { users: 0, orders: 0, revenue: 0 } };
  }
}
