import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/@types/interfaces/response';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { FriendshipService } from '../../domains/friendship.service';
import { SendFriendshipRequestDto } from '../dto/sendFriendshipRequest.dto';
import { FriendshipStatus } from '../type/enum/friendshipStatus.enum';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async sendFriendshipRequest(
    @Req() req: RequestWithUser,
    @Body() { receiveExternalId }: SendFriendshipRequestDto,
  ) {
    const username = req.user.username;

    await this.friendshipService.sendFriendshipRequest(
      username,
      receiveExternalId,
    );

    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Convite enviado com sucesso!',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch(':externalId/accept')
  async acceptFriendship(@Param('externalId') friendshipExternalId: string) {
    await this.friendshipService.acceptFriendshipRequest(friendshipExternalId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Convite aceito!',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch(':externalId/refused')
  async refusedFriendship(@Param('externalId') friendshipExternalId: string) {
    await this.friendshipService.refusedFriendshipRequest(friendshipExternalId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Convite recusado!',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  async listAllFrienshipRequest(
    @Req() req: RequestWithUser,
    @Query('status') status: FriendshipStatus,
  ) {
    const username = req.user.username;

    const requestList = await this.friendshipService.findAllFriendshipRequest(
      username,
      status,
    );

    return {
      statusCode: HttpStatus.OK,
      friendshipRequests: requestList,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('available-users')
  async listAvailableUsers(@Req() req: RequestWithUser) {
    const externalId = req.user.externalId;

    const availableUsers =
      await this.friendshipService.findAvailableUsers(externalId);

    return {
      statusCode: HttpStatus.OK,
      availableUsers,
    };
  }
}
