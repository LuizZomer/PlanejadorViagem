import { City } from '@prisma/client';
import { TCreateCity } from 'src/@types/types/create-city.type';
import { CreateCityDto } from '../presentation/dto/create-city.dto';
import { ICityWithPlaces } from '../presentation/types/cityWithPlaces';

export class CityGatewayInterface {
  findCityAndPlaceByExternalId: (userId: number) => Promise<City>;
  findAllCities: (userId: number) => Promise<City[]>;
  createCity: (cityData: CreateCityDto, userId: number) => Promise<City>;
  findCityByExternalId: (cityExternalId: string) => Promise<ICityWithPlaces>;
}
