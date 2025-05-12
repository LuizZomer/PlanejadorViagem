import { IsString } from 'class-validator';

export class UserPreferenceDto {
  @IsString()
  preferencesId: string;
}
