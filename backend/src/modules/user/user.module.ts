import { Module } from '@nestjs/common';
import { RegisterUseCase } from './domains/use-case/register.use-case';
import { UserController } from './presentation/controller/user.controller';
import { UserService } from './domains/user.service';

@Module({
  controllers: [UserController],
  providers: [RegisterUseCase, UserService],
  exports: [UserService],
})
export class UserModule {}
