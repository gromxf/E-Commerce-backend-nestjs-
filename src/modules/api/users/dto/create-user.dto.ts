import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreateAddressWithoutUserDto } from './create-address-without-user.dto';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressWithoutUserDto)
    Address: CreateAddressWithoutUserDto[];

}