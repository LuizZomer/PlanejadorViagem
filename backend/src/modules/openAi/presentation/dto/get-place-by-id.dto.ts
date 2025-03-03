import { IsString } from 'class-validator';

export class GetPlaceByCity {
  @IsString({ message: 'Campo cidade é obrigatório' })
  city: string;
}
