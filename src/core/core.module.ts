import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './corePrisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from 'src/modules/seeder/seeder.modules';
import { SeederService } from 'src/modules/seeder/seeder.service';
import { ProductsModule } from 'src/modules/products/products.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';



@Module({
  //import toate modelele
  imports: [PrismaModule, JwtModule, SeederModule, CloudinaryModule, ProductsModule, CategoriesModule, OrdersModule, UsersModule, AuthModule, AdminModule],
})
export class CoreModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) { }

  async onModuleInit() {
    await this.seederService.seed(); // aici rulezi seed-ul automat
  }
}