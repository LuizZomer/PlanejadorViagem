import { Injectable } from '@nestjs/common';
import { FriendshipGateway } from '../../gateway/friendship-gateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class FindAvailableUsersUseCase {
  constructor(
    private readonly friendshipGateway: FriendshipGateway,
    private readonly userService: UserService,
  ) {}

  async execute(userExternalId: string) {
    const user = await this.userService.findOneByExternalId(userExternalId);
    return this.friendshipGateway.findAllUsersWithoutFriendRequest(user.id);
  }
}
