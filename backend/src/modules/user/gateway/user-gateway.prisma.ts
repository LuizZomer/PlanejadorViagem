import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserGatewayInterface } from './user-gateway.interface';

@Injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto) {
    const { preferences, ...rest } = userData;

    return this.prisma.user.create({
      data: {
        ...rest,
        userPreferences: {
          createMany: {
            data: preferences.map((id) => ({ preferencesId: id })),
          },
        },
      },
      include: {
        userPreferences: {
          include: {
            preference: true,
          },
        },
      },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findOneByExternalId(externalId: string): Promise<User | null> {
    console.log(externalId);

    return this.prisma.user.findUnique({
      where: {
        externalId,
      },
    });
  }

  async findAllUsers(search: string | undefined) {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: search || '',
        },
      },
    });
  }
}
