import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/corePrisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    // POST /orders
    async create(createOrderDto: CreateOrderDto) {
        return this.prisma.order.create({
            data: {
                userId: createOrderDto.userId,
                total: createOrderDto.total,
                items: {
                    create: createOrderDto.items
                }
            },
        });
    }

    // GET /orders
    async findAll() {
        return this.prisma.order.findMany({
            include: {
                items: true,
            },
        });
    }

    // GET /orders/:id
    async findOne(id: number) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
            },
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
    }

    // PUT /orders/:id
    async update(id: number, updateData: Partial<CreateOrderDto>) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return this.prisma.order.update({
            where: { id },
            data: {
                userId: updateData.userId,
                total: updateData.total,
            },
        });
    }

    // DELETE /orders/:id
    async remove(id: number) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return this.prisma.order.delete({ where: { id } });
    }

}
