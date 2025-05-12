import { PrismaService } from 'src/core/prisma/prisma.service';
import { FriendshipGatewayInterface } from './friendship-gateway.interface';
import { FriendshipStatus } from '../presentation/type/enum/friendshipStatus.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendshipGateway implements FriendshipGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async sendFriendshipRequest(
    senderUser: number,
    receiveUser: number,
    externalId: string | null,
  ) {
    return this.prisma.friendship.upsert({
      where: { externalId },
      update: { status: FriendshipStatus.PENDING },
      create: {
        status: FriendshipStatus.PENDING,
        requesterId: senderUser,
        receiverId: receiveUser,
      },
    });
  }

  async findFriendshipRequest(senderUser: number, receiveUser: number) {
    return this.prisma.friendship.findFirst({
      where: {
        receiverId: receiveUser,
        requesterId: senderUser,
      },
    });
  }

  async acceptFriendshipRequest(requestExternalId: string) {
    return this.prisma.friendship.update({
      where: {
        externalId: requestExternalId,
      },
      data: {
        status: FriendshipStatus.ACCEPT,
      },
    });
  }

  async refusedFriendshipRequest(requestExternalId: string) {
    return this.prisma.friendship.update({
      where: {
        externalId: requestExternalId,
      },
      data: {
        status: FriendshipStatus.REFUSED,
      },
    });
  }

  async findAllFriendshipRequest(userId: number, status: FriendshipStatus) {
    return this.prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status,
      },
      include: {
        requester: {
          select: {
            externalId: true,
            username: true,
          },
        },
      },
    });
  }
}
