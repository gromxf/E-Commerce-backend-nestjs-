import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentInfoDto } from './dto/payment-info.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }
  // POST /orders
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // GET /orders
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // GET /orders/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  // PUT /orders/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  // DELETE /orders/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }

  // POST /orders/payment-info
  @Post('payment-info')
  processPaymentInfo(@Body() paymentInfoDto: PaymentInfoDto) {
    return this.ordersService.processPaymentInfo(paymentInfoDto);
  }

  // POST /orders/validate-stock
  @Post('validate-stock')
  validateStock(@Body() body: { items: OrderItemDto[] }) {
    return this.ordersService.validateStock(body.items);
  }
}
