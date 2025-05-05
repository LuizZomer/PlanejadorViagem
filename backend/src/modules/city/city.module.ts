import { Module } from '@nestjs/common';
import { CityService } from './domains/city.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CityGateway } from './gateway/city-gateway.prisma';
import { GetCitiesByUserExternalIdUseCase } from './domains/use-case/get-cities-by-user-external-id.use-case';
// import { GetAllCitiesUseCase } from './domains/use-case/get-all-cities.use-case';
import { CityController } from './presentation/controllers/city.controller';
import { CreateCityWithUseCase } from './domains/use-case/create-city-with-places.use-case';
import { UserService } from '../user/domains/user.service';
import { UserModule } from '../user/user.module';
import { GetCityByExternalId } from './domains/use-case/get-city-by-external-id.use-case';

@Module({
  imports: [UserModule],
  controllers: [CityController],
  providers: [
    CityService,
    PrismaService,
    CityGateway,
    GetCitiesByUserExternalIdUseCase,
    // GetAllCitiesUseCase,
    CreateCityWithUseCase,
    GetCityByExternalId,
  ],
  exports: [CityService],
})
export class CityModule {}
