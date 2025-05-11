import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { FriendshipGateway } from '../../gateway/friendship-gateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class FindAllFriendshipRequestUseCase {
  constructor(
    private readonly friendshipGateway: FriendshipGateway,
    private readonly userService: UserService,
  ) {}

  async execute(username: string) {
    console.log(username);

    const user = await this.userService.findOneByUsername(username);

    console.log(user);

    return this.friendshipGateway.findAllFriendshipRequest(user.id);
  }
}
