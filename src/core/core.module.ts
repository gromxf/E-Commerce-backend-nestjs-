import { Module } from '@nestjs/common';
import { PrismaModule } from './corePrisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from 'src/modules/products/products.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  //import toate modelele
  imports: [PrismaModule, JwtModule, CloudinaryModule, ProductsModule, CategoriesModule, OrdersModule, UsersModule, AuthModule, AdminModule],
})
export class CoreModule { }
