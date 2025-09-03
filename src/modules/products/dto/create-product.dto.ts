import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}

