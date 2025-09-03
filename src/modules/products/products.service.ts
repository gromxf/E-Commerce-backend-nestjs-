import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/corePrisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    // POST /products
    async create(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                description: createProductDto.description,
                price: createProductDto.price,
                stock: createProductDto.stock,
                images: {
                    create: createProductDto.images.map((url) => ({ url })),
                },
                category: {
                    connect: { id: createProductDto.categoryId },
                },
            },
            include: {
                images: true,
                category: true,
            },
        });
    }

    // GET /products
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                images: true,
                category: true,
            },
        });
    }

    // GET /products/:id
    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
            },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    // PUT /products/:id
    async update(id: number, updateData: Partial<CreateProductDto>) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.prisma.product.update({
            where: { id },
            data: {
                ...updateData,
                images: updateData.images
                    ? {
                        deleteMany: {}, // ștergem imaginile existente
                        create: updateData.images.map((url) => ({ url })),
                    }
                    : undefined,
            },
            include: {
                images: true,
                category: true,
            },
        });
    }

    // DELETE /products/:id
    async remove(id: number) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.prisma.product.delete({ where: { id } });
    }

    // GET /products/category/:categoryId
    async findByCategory(categoryId: number) {
        return this.prisma.product.findMany({
            where: { categoryId },
            include: {
                images: true,
                category: true,
            },
        });
    }
}
