import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';
import { FriendshipGateway } from '../../gateway/friendship-gateway.prisma';
import { FriendshipStatus } from '../../presentation/type/enum/friendshipStatus.enum';

@Injectable()
export class SendFriendshipRequestUseCase {
  constructor(
    private readonly friendshipGateway: FriendshipGateway,
    private readonly userService: UserService,
  ) {}

  async execute(senderUsername: string, receiveUserExternalId: string) {
    const sender = await this.userService.findOneByUsername(senderUsername);

    const receive = await this.userService.findOneByExternalId(
      receiveUserExternalId,
    );

    const friendshipReq = await this.friendshipGateway.findFriendshipRequest(
      sender.id,
      receive.id,
    );

    if (friendshipReq && friendshipReq.status !== FriendshipStatus.REFUSED) {
      throw new BadRequestException('Convite já enviado ou aceito!');
    }

    return this.friendshipGateway.sendFriendshipRequest(
      sender.id,
      receive.id,
      friendshipReq.externalId,
    );
  }
}
