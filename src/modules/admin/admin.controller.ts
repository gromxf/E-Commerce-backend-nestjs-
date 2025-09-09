import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard() {
    return {
      message: 'Admin dashboard',
      at: new Date().toISOString()
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data')
  getProtectedData() {
    return {
      stats: {
        users: 0,
        orders: 0,
        revenue: 0
      }
    };
  }
}
