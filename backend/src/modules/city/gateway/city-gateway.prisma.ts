import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCityDto } from '../presentation/dto/create-city.dto';
import { CityGatewayInterface } from './city-gateway.interface';
import { CreatePlaceDto } from 'src/modules/place/presentation/dto/create-place.dto';
import { ICityWithPlaces } from '../presentation/types/cityWithPlaces';

@Injectable()
export class CityGateway {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCities(userId: number) {
    //return this.prisma.city.findMany({ where: { userId } });
  }

  async findCityAndPlaceByExternalId(cityId: number) {
    ///return this.prisma.city.findUnique({
    // where: {
    //   id: cityId,
    // },
    //include: {
    //Place: {
    //select: {
    //externalId: true,
    // description: true,
    /// latitude: true,
    // longitude: true,
    //name: true,
    //},
    // },
    //},
    //});
  }

  async createCity(cityData: CreateCityDto, userId: number) {
    const {
      country,
      description,
      name,
      places,
      spendingLevel,
      latitude,
      longitude,
    } = cityData;

    const placesArray: CreatePlaceDto[] = places.map(
      ({ name, description, latitude, longitude }) => ({
        name,
        latitude,
        longitude,
        description,
      }),
    );

    const city: Omit<CreateCityDto, 'places'> & { userId: number } = {
      country,
      description,
      name,
      userId,
      spendingLevel,
      latitude,
      longitude,
    };

    //return this.prisma.city.create({
    // data: {
    //  ...city,
    //  userId,
    // Place: {
    //   create: placesArray,
    // },
    // },
    // include: {
    //  Place: {
    //    select: {
    //      description: true,
    //      externalId: true,
    //      latitude: true,
    //      longitude: true,
    //     name: true,
    //  },
    //},
    //},
    //});
  }

  async findCityByExternalId(externalId: string) {
    //: Promise<ICityWithPlaces>
    //return this.prisma.city.findFirst({
    // where: { externalId },
    // include: { Place: true },
    //});
  }
}
