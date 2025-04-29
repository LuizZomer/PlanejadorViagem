import { Injectable } from '@nestjs/common';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';
import { User } from '@prisma/client';
import { CreateUserOutputDto } from '../../presentation/dto/create-user-output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(userData: CreateUserDto): Promise<CreateUserOutputDto> {
    const hashPassword = await this.encryptingPassword(userData.password);

    userData.password = hashPassword;

    const newUser = await this.userGateway.createUser(userData);

    const mapperNewUser = this.userMapper(newUser);

    return mapperNewUser;
  }

  userMapper({
    email,
    username,
    externalId,
  }: Partial<User>): CreateUserOutputDto {
    return {
      email,
      externalId,
      username,
    };
  }

  async encryptingPassword(password: string) {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }
}
