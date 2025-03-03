import { TCreateCity } from 'src/@types/types/create-city.type';
import { CityGateway } from '../../gateway/city-gateway.prisma';
import { CreateCityDto } from '../../presentation/dto/create-city.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCityWithUseCase {
  constructor(private readonly cityGateway: CityGateway) {}

  execute(cityData: CreateCityDto) {
    return this.cityGateway.createCity(cityData);
  }
}
