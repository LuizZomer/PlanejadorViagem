import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { FriendshipGateway } from '../../gateway/friendship-gateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';
import { FriendshipStatus } from '../../presentation/type/enum/friendshipStatus.enum';
import { Friendship } from '@prisma/client';
import { IFindAllFriendshipOutput } from '../../presentation/output/findAllFriendshipRequest.output';
import { IFriendshipWithUser } from '../../presentation/type/friendshipWithUser';

@Injectable()
export class FindAllFriendshipRequestUseCase {
  constructor(
    private readonly friendshipGateway: FriendshipGateway,
    private readonly userService: UserService,
  ) {}

  async execute(username: string, status: FriendshipStatus) {
    const user = await this.userService.findOneByUsername(username);

    const allFriendshipRequest =
      await this.friendshipGateway.findAllFriendshipRequest(user.id, status);

    return this.allFriendshipMapper(allFriendshipRequest, username);
  }

  allFriendshipMapper(
    allFriendship: IFriendshipWithUser[],
    username: string,
  ): IFindAllFriendshipOutput[] {
    return allFriendship.map(({ createdAt, externalId, status, requester, receiver }) => {
      const friend = requester.username === username ? receiver : requester;
      return {
        createdAt,
        externalId,
        friend,
        status,
      };
    });
  }
}
