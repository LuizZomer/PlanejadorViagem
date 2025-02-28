import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from './use-case/register.use-case';
import { CreateUserDto } from '../presentation/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  async register(userData: CreateUserDto) {
    const newUser = await this.registerUseCase.execute(userData);

    return newUser;
  }
}
