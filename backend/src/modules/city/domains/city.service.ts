import { Injectable } from '@nestjs/common';
// import { GetAllCitiesUseCase } from './use-case/get-all-cities.use-case';
import { TCreateCity } from 'src/@types/types/create-city.type';
import { CreateCityWithUseCase } from './use-case/create-city-with-places.use-case';
import { CreateCityDto } from '../presentation/dto/create-city.dto';
import { GetCityByExternalIdUseCase } from './use-case/get-city-by-external-id.use-case';

@Injectable()
export class CityService {
  constructor(
    // private readonly getAllCitiesUseCase: GetAllCitiesUseCase,
    private readonly createCityUseCase: CreateCityWithUseCase,
    private readonly getCityByExternalIdUseCase: GetCityByExternalIdUseCase,
  ) {}

  // async getAllCities() {
  //   return this.getAllCitiesUseCase.execute();
  // }

  async getAllCityByExternalId(username: string) {
    return this.getCityByExternalIdUseCase.execute(username);
  }

  async createCity(cityData: CreateCityDto, username: string) {
    return this.createCityUseCase.execute(cityData, username);
  }
}
