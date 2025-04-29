import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from './use-case/register.use-case';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { FindByUsernameUseCase } from './use-case/findUserByUsername.use-case';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly findByUsernameUseCase: FindByUsernameUseCase,
  ) {}

  async register(userData: CreateUserDto) {
    return this.registerUseCase.execute(userData);
  }

  async findOneByUsername(externalId: string): Promise<User | null> {
    return this.findByUsernameUseCase.execute(externalId);
  }
}
