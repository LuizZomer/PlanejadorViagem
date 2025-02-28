import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserGatewayInterface } from './user-gateway.interface';

@Injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(UserData: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: UserData,
    });

    return newUser;
  }
}
