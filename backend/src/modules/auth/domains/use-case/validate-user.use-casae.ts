import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user) {
      const correctPassword = await this.verifyPassword(user.password, pass);

      if (correctPassword) {
        const { password, ...result } = user;

        return result;
      }
    }
    return null;
  }

  async verifyPassword(
    userPassword: string,
    loginPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(loginPassword, userPassword);
  }
}
