import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/corePrisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../../core/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloudinary: CloudinaryService,
    ) { }

    // POST /products
    async create(createProductDto: CreateProductDto) {
        const incomingImages = createProductDto.images || [];
        const imageUrls: string[] = [];

        for (const img of incomingImages) {
            if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
                imageUrls.push(img);
            } else if (typeof img === 'string') {
                const uploadedUrl = await this.cloudinary.uploadDataUrl(img);
                imageUrls.push(uploadedUrl);
            }
        }

        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                description: createProductDto.description,
                price: createProductDto.price,
                stock: createProductDto.stock,
                images: imageUrls.length > 0 ? {
                    create: imageUrls.map((url) => ({ url })),
                } : undefined,
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
    async findAll(categoryIds?: number[]) {
        const whereClause = categoryIds && categoryIds.length > 0
            ? { categoryId: { in: categoryIds } }
            : {};

        return this.prisma.product.findMany({
            where: whereClause,
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

        // Process images if provided
        const incomingImages = updateData.images || [];
        const imageUrls: string[] = [];
        for (const img of incomingImages) {
            if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
                imageUrls.push(img);
            } else if (typeof img === 'string') {
                const uploadedUrl = await this.cloudinary.uploadDataUrl(img);
                imageUrls.push(uploadedUrl);
            }
        }

        return this.prisma.product.update({
            where: { id },
            data: {
                ...updateData,
                images: imageUrls.length > 0
                    ? {
                        deleteMany: {},
                        create: imageUrls.map((url) => ({ url })),
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
