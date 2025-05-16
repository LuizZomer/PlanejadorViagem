import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { CreateUserOutputDto } from '../../presentation/output/create-user-output.dto';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';
import { ICreateUserOutput } from '../../presentation/output/createUser.output';

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
    externalId,
    userPreferences,
    username,
  }: ICreateUserOutput): CreateUserOutputDto {
    return {
      email,
      externalId,
      username,
      userPreferences: {
        preferences: userPreferences.map(({ preference }) => ({
          externalId: preference.externalId,
          name: preference.name,
        })),
      },
    };
  }

  async encryptingPassword(password: string) {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(password, salt);
  }
}
