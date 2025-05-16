import { IsArray, IsString } from 'class-validator';

export class ChangeUserOrganization {
  @IsString({ message: 'A organização é obrigatório' })
  organizationExternalId: string;

  @IsArray({ message: 'Os usuários devem ser um array' })
  @IsString({ each: true, message: 'Cada usuário deve ser uma string' })
  usersExternalId: string[];
}
