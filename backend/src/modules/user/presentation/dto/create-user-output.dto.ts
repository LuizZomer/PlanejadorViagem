import { Preferences } from '@prisma/client';

export class CreateUserOutputDto {
  externalId: string;
  username: string;
  email: string;
  preferences: Pick<Preferences, 'externalId' | 'name'>[];
}
