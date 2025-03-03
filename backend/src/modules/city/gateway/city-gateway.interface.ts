import { City } from '@prisma/client';
import { TCreateCity } from 'src/@types/types/create-city.type';

export class CityGatewayInterface {
  findCityAndPlaceByExternalId: (externalId: string) => Promise<City>;
  findAllCities: () => Promise<City[]>;
  createCity: (cityData: TCreateCity) => Promise<City>;
}
