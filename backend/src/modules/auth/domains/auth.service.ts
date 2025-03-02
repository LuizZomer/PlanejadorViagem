import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/domains/user.service';
import { ValidateUserUseCase } from './use-case/validate-user.use-casae';
import { LoginUsecase } from './use-case/login.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUsecase,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    return this.validateUserUseCase.execute(username, pass);
  }

  async login(user: User): Promise<{ access_token: string }> {
    return this.loginUseCase.execute(user);
  }
}
