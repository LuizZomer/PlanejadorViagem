import { IsString } from 'class-validator';

export class GetPlaceByCity {
  @IsString({ message: 'Campo cidade é obrigatório' })
  city: string;

  @IsString({ message: 'Campo pais é obrigatório' })
  country: string;

  @IsString({ message: 'Campo nivel de orçamento é obrigatório' })
  spendingLevel: string;
}
