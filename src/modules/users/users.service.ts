import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/corePrisma/prisma.service';
import { CreateAddresDto } from './dto/create-addres.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    // POST /users

    async create(createUserDto: CreateUserDto) {
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
            include: { addresses: true }
        });

        if (existingUser) {
            // User exists, just add new addresses if any
            if (createUserDto.Address && createUserDto.Address.length > 0) {
                await this.prisma.address.createMany({
                    data: createUserDto.Address.map(addr => ({
                        userId: existingUser.id,
                        street: addr.street,
                        city: addr.city,
                        postal: addr.postal
                    }))
                });
            }
            return existingUser;
        } else {
            // Create new user with addresses
            return this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    addresses: {
                        create: createUserDto.Address.map(addr => ({
                            street: addr.street,
                            city: addr.city,
                            postal: addr.postal
                        }))
                    },
                },
                include: {
                    addresses: true,
                    orders: {
                        include: {
                            items: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // GET /users
    async findAll() {
        return this.prisma.user.findMany({
            include: {
                addresses: true,
                orders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
        });
    }
}

