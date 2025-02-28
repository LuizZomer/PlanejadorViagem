import { User } from '@prisma/client';
import { CreateUserDto } from '../presentation/dto/create-user.dto';

export class UserGatewayInterface {
  createUser: (UserData: CreateUserDto) => Promise<User>;
}
