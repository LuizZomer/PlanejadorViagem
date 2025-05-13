import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString({ message: 'Campo nome é obrigatório' })
  name: string;

  @IsArray({ message: 'Campo de usuarios precisa ser um array' })
  @IsString({ each: true })
  @IsOptional()
  usersExternalId: string[];
}
