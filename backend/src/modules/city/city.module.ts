import { Module } from '@nestjs/common';
import { CityService } from './domains/city.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CityGateway } from './gateway/city-gateway.prisma';
import { GetCityByExternalIdUseCase } from './domains/use-case/get-city-by-external-id.use-case';
import { GetAllCitiesUseCase } from './domains/use-case/get-all-cities.use-case';
import { CityController } from './presentation/controllers/city.controller';
import { CreateCityWithUseCase } from './domains/use-case/create-city-with-places.use-case';

@Module({
  controllers: [CityController],
  providers: [
    CityService,
    PrismaService,
    CityGateway,
    GetCityByExternalIdUseCase,
    GetAllCitiesUseCase,
    CreateCityWithUseCase,
  ],
  exports: [CityService],
})
export class CityModule {}
