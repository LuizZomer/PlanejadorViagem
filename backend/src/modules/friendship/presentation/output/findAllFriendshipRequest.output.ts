import { Friendship, User } from '@prisma/client';

export interface IFindAllFriendshipOutput
  extends Pick<Friendship, 'externalId' | 'status' | 'createdAt'> {
  requester: Pick<User, 'externalId' | 'username'>;
}
