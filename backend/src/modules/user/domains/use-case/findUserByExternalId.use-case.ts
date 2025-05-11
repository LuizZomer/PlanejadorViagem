import { Injectable } from '@nestjs/common';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { User } from '@prisma/client';

@Injectable()
export class FindByExternalIdUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(externalId: string): Promise<User | null> {
    return this.userGateway.findOneByExternalId(externalId);
  }
}
