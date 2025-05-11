import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../domains/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers(@Param('search') search: string) {
    return this.userService.findAllUsers(search);
  }
}
