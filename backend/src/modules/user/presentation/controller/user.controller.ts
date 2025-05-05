import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../domains/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }
}
