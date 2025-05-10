import { Injectable } from '@nestjs/common';
import { CityGateway } from '../../gateway/city-gateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';

@Injectable()
export class GetCitiesByUserExternalIdUseCase {
  constructor(
    private readonly cityGateway: CityGateway,
    private readonly userService: UserService,
  ) {}

  async execute(username: string) {
    const user = await this.userService.findOneByUsername(username);

    const cities = await this.cityGateway.findAllCities(user.id);

    return this.citiesMapper(cities);
  }

  citiesMapper(cities: any): ICitiesOutput[] {
    return cities.map(
      ({ country, description, externalId, name, spendingLevel }) => ({
        country,
        description,
        externalId,
        name,
        spendingLevel,
      }),
    );
  }
}
