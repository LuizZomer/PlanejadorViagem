import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthService } from '../../domains/auth.service';
import { LocalAuthGuard } from 'src/utils/guards/local-auth.guard';
import { RequestWithUser } from 'src/@types/interfaces/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async verifyJwt(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
