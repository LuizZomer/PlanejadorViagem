import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserGatewayInterface } from './user-gateway.interface';

@Injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: { ...userData },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}
