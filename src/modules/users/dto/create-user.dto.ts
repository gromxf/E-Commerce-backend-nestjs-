import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
