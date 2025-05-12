import { Injectable } from '@nestjs/common';
import { SendFriendshipRequestUseCase } from './use-case/sendFriendshipRequest.use-case';
import { AcceptFriendshipRequestUseCase } from './use-case/acceptFriendshipRequest.use-case';
import { RefusedFriendshipRequestUseCase } from './use-case/refusedFriendshipRequest.use-case';
import { FindAllFriendshipRequestUseCase } from './use-case/findAllFriendshipRequest.use-case';
import { FriendshipStatus } from '../presentation/type/enum/friendshipStatus.enum';

@Injectable()
export class FriendshipService {
  constructor(
    private readonly sendFriendshipRequestUseCase: SendFriendshipRequestUseCase,
    private readonly acceptFriendshipRequestUseCase: AcceptFriendshipRequestUseCase,
    private readonly refusedFriendshipRequestUseCase: RefusedFriendshipRequestUseCase,
    private readonly findAllFriendshipRequestUseCase: FindAllFriendshipRequestUseCase,
  ) {}

  async sendFriendshipRequest(
    senderUsername: string,
    receiveUserExternalId: string,
  ) {
    return this.sendFriendshipRequestUseCase.execute(
      senderUsername,
      receiveUserExternalId,
    );
  }

  async acceptFriendshipRequest(requestExternalId: string) {
    return this.acceptFriendshipRequestUseCase.execute(requestExternalId);
  }

  async refusedFriendshipRequest(requestExternalId: string) {
    return this.refusedFriendshipRequestUseCase.execute(requestExternalId);
  }

  async findAllFriendshipRequest(username: string, status: FriendshipStatus) {
    return this.findAllFriendshipRequestUseCase.execute(username, status);
  }
}
