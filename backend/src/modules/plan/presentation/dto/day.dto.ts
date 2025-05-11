import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActiveDto } from './activie.dto';

export class PlanDayDto {
  @IsDateString({}, { message: 'Campo data é obrigatório' })
  date: string;

  @IsString({ message: 'Campo expectativa de gasto é obrigatório' })
  expense: string;
  @IsOptional()
  @IsNumber({}, { message: 'Média de temperatura deve ser um numero' })
  averageTemp?: number;

  @IsOptional()
  @IsString({ message: 'Campo clima deve ser string' })
  weather?: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ActiveDto)
  activities: ActiveDto[];
}
