import { Preferences, User, UserPreferences } from '@prisma/client';

interface IUserPreferences extends UserPreferences {
  preference: Preferences;
}

export interface ICreateUserOutput extends User {
  userPreferences: IUserPreferences[];
}
