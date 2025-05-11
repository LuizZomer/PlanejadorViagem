import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { FriendshipGateway } from '../../gateway/friendship-gateway.prisma';

@Injectable()
export class AcceptFriendshipRequestUseCase {
  constructor(private readonly friendshipGateway: FriendshipGateway) {}

  async execute(requestExternalId: string) {
    return this.friendshipGateway.acceptFriendshipRequest(requestExternalId);
  }
}
