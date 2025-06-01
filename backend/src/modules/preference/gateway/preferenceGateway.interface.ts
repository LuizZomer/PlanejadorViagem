import { Preferences } from '@prisma/client';

export class PreferenceGatewayInterface {
  findAll: () => Promise<Preferences[]>;
}
