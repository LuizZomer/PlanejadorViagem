import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

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
}
