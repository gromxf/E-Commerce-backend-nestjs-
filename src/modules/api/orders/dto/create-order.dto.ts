import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsArray()
    @ValidateNested({ each: true }) // validate each item inside the array
    @Type(() => OrderItemDto) // transform plain JSON into OrderItemDto instances
    items: OrderItemDto[];
}
