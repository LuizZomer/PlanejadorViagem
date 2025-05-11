import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from './use-case/register.use-case';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { FindByUsernameUseCase } from './use-case/findUserByUsername.use-case';
import { User } from '@prisma/client';
import { FindByExternalIdUseCase } from './use-case/findUserByExternalId.use-case';
import { FindAllUserUseCase } from './use-case/findAllUser.use-case';
import { IListAllUserOutput } from '../presentation/output/listAllUser.output';

@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly findByUsernameUseCase: FindByUsernameUseCase,
    private readonly findByExternalIdUseCase: FindByExternalIdUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  async register(userData: CreateUserDto) {
    return this.registerUseCase.execute(userData);
  }

  async findOneByUsername(externalId: string): Promise<User | null> {
    return this.findByUsernameUseCase.execute(externalId);
  }

  async findOneByExternalId(externalId: string): Promise<User | null> {
    return this.findByExternalIdUseCase.execute(externalId);
  }

  async findAllUsers(
    search: string | undefined,
  ): Promise<IListAllUserOutput[]> {
    return this.findAllUserUseCase.execute(search);
  }
}
