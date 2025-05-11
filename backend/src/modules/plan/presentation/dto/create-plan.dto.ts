import { Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PlanDayDto } from './day.dto';

export class CreatePlanDto {
  @IsString({ message: 'O campo destino é obrigatório' })
  destination: string;

  @IsString({ message: 'O campo nome é obrigatório' })
  country: string;

  @IsString({ message: 'O campo description é obrigatório' })
  description: string;

  @IsNumber({}, { message: 'O campo latitude da cidade é obrigatório' })
  latitude: number;

  @IsNumber({}, { message: 'O campo longitude da cidade é obrigatório' })
  longitude: number;

  @IsDateString(
    {},
    { message: 'O campo data de inicio da cidade é obrigatório' },
  )
  startDate: string;

  @IsDateString({}, { message: 'O campo data de fim da cidade é obrigatório' })
  endDate: string;

  @IsString({ message: 'Campo nivel de orçamento é obrigatório' })
  spendingLevel: string;

  @IsString({ message: 'Campo hospedagem é obrigatório' })
  @IsOptional()
  host: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => PlanDayDto)
  days: PlanDayDto[];
}
