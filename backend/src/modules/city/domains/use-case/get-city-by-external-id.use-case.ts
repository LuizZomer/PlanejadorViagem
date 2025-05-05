import { Injectable } from '@nestjs/common';
import { CityGateway } from '../../gateway/city-gateway.prisma';
import { City } from '@prisma/client';
import {
  ICityWithPlaces,
  ICityWithPlacesMapper,
} from '../../presentation/types/cityWithPlaces';

@Injectable()
export class GetCityByExternalId {
  constructor(private readonly cityGateway: CityGateway) {}

  async execute(cityExternalId: string) {
    const city = await this.cityGateway.findCityByExternalId(cityExternalId);

    return this.cityMapper(city);
  }

  cityMapper(city: ICityWithPlaces): ICityWithPlacesMapper {
    return {
      country: city.country,
      description: city.description,
      externalId: city.externalId,
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      spendingLevel: city.spendingLevel,
      Place: city.Place.map(
        ({ description, externalId, latitude, longitude, name }) => ({
          description,
          externalId,
          latitude,
          longitude,
          name,
        }),
      ),
    };
  }
}
