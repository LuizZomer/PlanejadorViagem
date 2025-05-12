import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { UserPreferenceDto } from './user-preferences.dto';

export class CreateUserDto {
  @IsString({ message: 'O username é obrigatório!' })
  username: string;

  @IsEmail({}, { message: 'Email obrigatório!' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 0,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'A senha Não está forte o sufiente!' },
  )
  password: string;

  @IsArray({ message: 'As preferências precisam ser um array!' })
  @IsNumber(
    {},
    { each: true, message: 'Cada preferência precisa ser um number!' },
  )
  preferences: number[];
}
