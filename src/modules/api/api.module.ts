import { Module } from "@nestjs/common"

import { ProductsModule } from "./products/products.module"
import { CategoriesModule } from "./categories/categories.module"
import { OrdersModule } from "./orders/orders.module"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { AdminModule } from "./admin/admin.module"

@Module({
    imports: [ProductsModule, CategoriesModule, OrdersModule, UsersModule, AuthModule, AdminModule]
})
export class ApiModule { }