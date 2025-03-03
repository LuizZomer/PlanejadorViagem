import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString({ message: 'O campo nome do lugar é obrigatório' })
  name: string;

  @IsString({ message: 'O campo descrição é obrigatório' })
  description: string;

  @IsNumber({}, { message: 'O campo latitude é obrigatório' })
  latitude: number;

  @IsNumber({}, { message: 'O campo longitude é obrigatório' })
  longitude: number;
}
