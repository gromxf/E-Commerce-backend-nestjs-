import { IsNotEmpty, IsNumber, IsString, } from 'class-validator';
export class CreateAddresDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postal: string;

}