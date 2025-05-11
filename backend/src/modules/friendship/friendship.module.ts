import { Module } from '@nestjs/common';
import { FriendshipService } from './domains/friendship.service';
import { FriendshipController } from './presentation/controller/friendship.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SendFriendshipRequestUseCase } from './domains/use-case/sendFriendshipRequest.use-case';
import { UserModule } from '../user/user.module';
import { FriendshipGateway } from './gateway/friendship-gateway.prisma';
import { AcceptFriendshipRequestUseCase } from './domains/use-case/acceptFriendshipRequest.use-case';
import { RefusedFriendshipRequestUseCase } from './domains/use-case/refusedFriendshipRequest.use-case';
import { FindAllFriendshipRequestUseCase } from './domains/use-case/findAllFriendshipRequest.use-case';

@Module({
  imports: [UserModule],
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    PrismaService,
    SendFriendshipRequestUseCase,
    FriendshipGateway,
    AcceptFriendshipRequestUseCase,
    RefusedFriendshipRequestUseCase,
    FindAllFriendshipRequestUseCase,
  ],
  exports: [FriendshipService],
})
export class FriendshipModule {}
