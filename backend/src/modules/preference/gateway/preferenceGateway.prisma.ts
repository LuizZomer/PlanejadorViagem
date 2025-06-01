import { Injectable } from '@nestjs/common';
import { PreferenceGatewayInterface } from './preferenceGateway.interface';
import { Preferences } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class PreferenceGateway implements PreferenceGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Preferences[]> {
    return this.prisma.preferences.findMany();
  }
}
