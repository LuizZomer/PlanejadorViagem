import { Injectable } from '@nestjs/common';
import { GetAllCitiesUseCase } from './use-case/get-all-cities.use-case';
import { TCreateCity } from 'src/@types/types/create-city.type';
import { CreateCityWithUseCase } from './use-case/create-city-with-places.use-case';
import { CreateCityDto } from '../presentation/dto/create-city.dto';

@Injectable()
export class CityService {
  constructor(
    private readonly getAllCitiesUseCase: GetAllCitiesUseCase,
    private readonly createCityUseCase: CreateCityWithUseCase,
  ) {}

  async getAllCities() {
    return this.getAllCitiesUseCase.execute();
  }

  async createCity(cityData: CreateCityDto) {
    return this.createCityUseCase.execute(cityData);
  }
}
