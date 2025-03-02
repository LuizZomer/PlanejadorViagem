import { Module } from '@nestjs/common';
import { RegisterUseCase } from './domains/use-case/register.use-case';
import { UserController } from './presentation/controller/user.controller';
import { UserService } from './domains/user.service';
import { UserGateway } from './gateway/user-gateway.prisma';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { FindByUsernameUseCase } from './domains/use-case/findUserByUsername.use-case';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    UserService,
    UserGateway,
    PrismaService,
    FindByUsernameUseCase,
  ],
  exports: [UserService],
})
export class UserModule {}
