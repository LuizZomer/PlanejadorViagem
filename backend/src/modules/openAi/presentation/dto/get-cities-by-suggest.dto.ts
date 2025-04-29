import { IsString } from 'class-validator';

export class GetCitiesByDescription {
  @IsString({ message: 'Campo pais é obrigatório' })
  description: string;

  @IsString({ message: 'Campo nivel de orçamento é obrigatório' })
  spendingLevel: string;
}
