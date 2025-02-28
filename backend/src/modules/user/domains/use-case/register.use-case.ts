import { UserGateway } from '../../gateway/user-gateway.prisma';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';

export class RegisterUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(userDate: CreateUserDto) {
    const newUser = await this.userGateway.createUser(userDate);

    return newUser;
  }
}
