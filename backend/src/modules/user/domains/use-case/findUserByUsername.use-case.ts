import { Injectable } from '@nestjs/common';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { User } from '@prisma/client';

@Injectable()
export class FindByUsernameUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(username: string): Promise<User | null> {
    return this.userGateway.findOneByUsername(username);
  }
}
