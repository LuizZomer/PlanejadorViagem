import { Injectable } from '@nestjs/common';
// import { GetAllCitiesUseCase } from './use-case/get-all-cities.use-case';
import { TCreateCity } from 'src/@types/types/create-city.type';
import { CreateCityWithUseCase } from './use-case/create-city-with-places.use-case';
import { CreateCityDto } from '../presentation/dto/create-city.dto';
import { GetCitiesByUserExternalIdUseCase } from './use-case/get-cities-by-user-external-id.use-case';
import { GetCityByExternalId } from './use-case/get-city-by-external-id.use-case';

@Injectable()
export class CityService {
  constructor(
    // private readonly getAllCitiesUseCase: GetAllCitiesUseCase,
    private readonly createCityUseCase: CreateCityWithUseCase,
    private readonly getCitiesByUserExternalIdUseCase: GetCitiesByUserExternalIdUseCase,
    private readonly getCityByExternalId: GetCityByExternalId,
  ) {}

  // async getAllCities() {
  //   return this.getAllCitiesUseCase.execute();
  // }

  async getAllCityByExternalId(username: string) {
    return this.getCitiesByUserExternalIdUseCase.execute(username);
  }

  async createCity(cityData: CreateCityDto, username: string) {
    return this.createCityUseCase.execute(cityData, username);
  }

  async findCityByExternalId(externalId: string) {
    return this.getCityByExternalId.execute(externalId);
  }
}
