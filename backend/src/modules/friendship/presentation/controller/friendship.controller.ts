import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { FriendshipService } from '../../domains/friendship.service';
import { RequestWithUser } from 'src/@types/interfaces/response';
import { SendFriendshipRequestDto } from '../dto/sendFriendshipRequest.dto';

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
  async listAllFrienshipRequest(@Req() req: RequestWithUser) {
    const username = req.user.username;

    const requestList =
      await this.friendshipService.findAllFriendshipRequest(username);

    return {
      statusCode: HttpStatus.OK,
      friendshipRequests: requestList,
    };
  }
}
