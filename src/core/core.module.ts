import { Module } from '@nestjs/common';
import { PrismaModule } from './corePrisma/prisma.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { UsersModule } from 'src/modules/users/users.module';


@Module({
  //import toate modelele
  imports: [PrismaModule, ProductsModule, CategoriesModule, OrdersModule, UsersModule],
})
export class CoreModule { }
