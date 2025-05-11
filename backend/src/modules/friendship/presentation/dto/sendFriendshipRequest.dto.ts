import { IsString } from 'class-validator';

export class SendFriendshipRequestDto {
  @IsString()
  receiveExternalId: string;
}
