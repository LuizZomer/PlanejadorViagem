import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from '../presentation/dto/create-user.dto';

@Injectable()
export class UserGateway {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(UserData: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: UserData,
    });

    return newUser;
  }
}
