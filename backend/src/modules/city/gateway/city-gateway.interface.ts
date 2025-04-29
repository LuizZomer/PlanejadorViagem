import { City } from '@prisma/client';
import { TCreateCity } from 'src/@types/types/create-city.type';

export class CityGatewayInterface {
  findCityAndPlaceByExternalId: (userId: number) => Promise<City>;
  findAllCities: (userId: number) => Promise<City[]>;
  createCity: (cityData: TCreateCity, userId: number) => Promise<City>;
}
