import { Friendship } from '@prisma/client';

export class FriendshipGatewayInterface {
  sendFriendshipRequest: (
    sendUser: number,
    receiveUser: number,
    externalId: string | null,
  ) => Promise<Friendship>;
  findFriendshipRequest: (
    sendUser: number,
    receiveUser: number,
  ) => Promise<Friendship | null>;
  acceptFriendshipRequest: (requestExternalId: string) => Promise<Friendship>;
  refusedFriendshipRequest: (requestExternalId: string) => Promise<Friendship>;
  findAllFriendshipRequest: (userId: number) => Promise<Friendship[]>;
}
