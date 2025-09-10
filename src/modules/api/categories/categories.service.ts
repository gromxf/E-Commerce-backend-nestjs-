import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/corePrisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    // POST /categories
    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                name: createCategoryDto.name,
                slug: createCategoryDto.slug,
            },
        });
    }

    // GET /categories
    async findAll() {
        return this.prisma.category.findMany({
            include: {
                products: true,
            },
        });
    }

    // GET /categories/:id
    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }


    // PUT /categories/:id
    async update(id: number, updateData: Partial<CreateCategoryDto>) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return this.prisma.category.update({
            where: { id },
            data: {
                ...updateData,
            },
            include: {
                products: true,
            },
        });
    }

    // DELETE /categories/:id
    async remove(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return this.prisma.category.delete({ where: { id } });
    }
}
