import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './domains/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './presentation/controller/auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { ValidateUserUseCase } from './domains/use-case/validate-user.use-casae';
import { LoginUsecase } from './domains/use-case/login.use-case';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ValidateUserUseCase,
    LoginUsecase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
