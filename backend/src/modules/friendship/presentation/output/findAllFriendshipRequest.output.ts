import { Friendship, User } from '@prisma/client';

export interface IFindAllFriendshipOutput
  extends Pick<Friendship, 'externalId' | 'status' | 'createdAt'> {
  friend: Pick<User, 'externalId' | 'username'>;
}
