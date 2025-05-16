import { Preferences, User, UserPreferences } from '@prisma/client';
import { Zlib } from 'zlib';

interface IUserPreferences {
  preferences: Pick<Preferences, 'externalId' | 'name'>[];
}

export interface CreateUserOutputDto
  extends Pick<User, 'externalId' | 'username' | 'email'> {
  externalId: string;
  username: string;
  email: string;
  userPreferences: IUserPreferences;
}
