import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressWithoutUserDto {
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
