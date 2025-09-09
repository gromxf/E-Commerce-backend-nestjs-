import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { AdminService } from './modules/admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  app.use(cookieParser());
  // Increase JSON/body size limits to support base64 payloads up to ~6MB
  app.use(json({ limit: '6mb' }));
  app.use(urlencoded({ limit: '6mb', extended: true }));

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const adminUser = process.env.INIT_ADMIN_USER;
  const adminPassword = process.env.INIT_ADMIN_PASSWORD;
  if (adminUser && adminPassword) {
    try {
      const adminService = app.get(AdminService);
      const count = await adminService.countAdmins();
      if (count === 0) {
        await adminService.createAdmin({ user: adminUser, password: adminPassword });
        console.log('Seeded initial admin');
      }
    } catch (err) {
      console.error('Failed to ensure initial admin:', err);
    }
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
