import { Injectable } from '@nestjs/common';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { User } from '@prisma/client';
import { IListAllUserOutput } from '../../presentation/output/listAllUser.output';

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(search: string | undefined): Promise<IListAllUserOutput[]> {
    const users = await this.userGateway.findAllUsers(search);

    return this.userListMapper(users);
  }

  userListMapper(users: User[]): IListAllUserOutput[] {
    return users.map(({ externalId, username }) => ({
      externalId,
      username,
    }));
  }
}
