import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString({ message: 'O campo nome do lugar é obrigatório' })
  name: string;

  @IsString({ message: 'O campo descrição é obrigatório' })
  description: string;

  @IsString({ message: 'O campo latitude é obrigatório' })
  latitude: string;

  @IsString({ message: 'O campo longitude é obrigatório' })
  longitude: string;
}
