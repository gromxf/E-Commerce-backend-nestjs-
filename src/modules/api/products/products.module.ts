import { Module, Global } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';


import { ImageModule } from './helper/imageH.module';

@Global()
@Module({
  imports: [ImageModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
