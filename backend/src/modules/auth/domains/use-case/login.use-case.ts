import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class LoginUsecase {
  constructor(private jwtService: JwtService) {}

  async execute(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, externalId: user.externalId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
