import { User } from '@prisma/client';
import { CreateUserDto } from '../presentation/dto/create-user.dto';

export class UserGatewayInterface {
  createUser: (UserData: CreateUserDto) => Promise<User>;
  findOneByUsername: (username: string) => Promise<User | null>;
  findOneByExternalId: (externalId: string) => Promise<User | null>;
  findAllUsers: (search: string) => Promise<User[]>;
}
