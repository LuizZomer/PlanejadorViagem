import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ActiveDto {
  @IsString({ message: 'O nome é obrigatório' })
  name: string;

  @IsString({ message: 'O campo descrição é obrigatório' })
  description: string;

  @IsNumber({}, { message: 'O campo latitude é obrigatório' })
  latitude: number;

  @IsNumber({}, { message: 'O campo latitude é obrigatório' })
  longitude: number;

  @IsString({ message: 'O campo descrição é obrigatório' })
  estimatedTime: string;

  @IsString({ message: 'O campo descrição é obrigatório' })
  @IsOptional()
  photoPath?: string;
}
