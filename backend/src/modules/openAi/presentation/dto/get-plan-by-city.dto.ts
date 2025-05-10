import {
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsString,
} from 'class-validator';

export class GetPlanByCity {
  @IsString({ message: 'Campo destino é obrigatório' })
  destination: string;

  @IsDateString({}, { message: 'Campo data de inicio é obrigatório' })
  startDate: string;

  @IsDateString({}, { message: 'Campo data de fim é obrigatório' })
  endDate: string;

  @IsString({ message: 'Campo pais é obrigatório' })
  country: string;

  @IsString({ message: 'Campo nivel de orçamento é obrigatório' })
  spendingLevel: string;

  @IsBooleanString({ message: 'Campo hospedagem é obrigatório' })
  hosting: boolean;
}
