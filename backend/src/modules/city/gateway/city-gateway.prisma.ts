import { Injectable } from '@nestjs/common';
import { City, Place } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCityDto } from '../presentation/dto/create-city.dto';
import { CityGatewayInterface } from './city-gateway.interface';
import { CreatePlaceDto } from 'src/modules/place/presentation/dto/create-place.dto';

@Injectable()
export class CityGateway implements CityGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCities(userId: number): Promise<City[]> {
    return this.prisma.city.findMany({ where: { userId } });
  }

  async findCityAndPlaceByExternalId(cityId: number): Promise<City> {
    return this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
      include: {
        Place: {
          select: {
            externalId: true,
            description: true,
            latitude: true,
            longitude: true,
            name: true,
          },
        },
      },
    });
  }

  async createCity(cityData: CreateCityDto, userId: number): Promise<City> {
    const { country, description, name, places } = cityData;

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
    };

    return this.prisma.city.create({
      data: {
        ...city,
        userId,
        Place: {
          create: placesArray,
        },
      },
      include: {
        Place: {
          select: {
            description: true,
            externalId: true,
            latitude: true,
            longitude: true,
            name: true,
          },
        },
      },
    });
  }
}
