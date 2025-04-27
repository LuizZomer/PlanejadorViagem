import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreatePlaceDto } from 'src/modules/place/presentation/dto/create-place.dto';

export class CreateCityDto {
  @IsString({ message: 'O campo nome da cidade é obrigatório' })
  name: string;

  @IsString({ message: 'O campo nome é obrigatório' })
  country: string;

  @IsString({ message: 'O campo description é obrigatório' })
  description: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreatePlaceDto)
  places: CreatePlaceDto[];
}
