import { Injectable } from '@nestjs/common';
import { CityGateway } from '../../gateway/city-gateway.prisma';

@Injectable()
export class GetAllCitiesUseCase {
  constructor(private readonly cityGateway: CityGateway) {}

  async execute() {
    console.log();

    return this.cityGateway.findAllCities();
  }
}
