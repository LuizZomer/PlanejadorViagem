import { Friendship, User } from '@prisma/client';

export interface IFriendshipWithUser extends Friendship {
  requester: Pick<User, 'externalId' | 'username'>;
  receiver: Pick<User, 'externalId' | 'username'>;
}
