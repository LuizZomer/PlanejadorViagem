import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/@types/interfaces/response';
import { getCitiesCacheKey } from 'src/utils/cache/citiesCache';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { CityService } from '../../domains/city.service';
import { CreateCityDto } from '../dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getAllCities(@Req() req: RequestWithUser) {
  //   const cities = await this.cityService.getAllCities();

  //   return {
  //     statusCode: HttpStatus.OK,
  //     content: { cities },
  //   };
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCitiesByExternalId(@Req() req: RequestWithUser) {
    const username = req.user.username;
    const cacheName = getCitiesCacheKey(username);

    let cities: ICitiesOutput[];

    cities = await this.cacheManager.get(cacheName);

    if (!cities) {
      cities = await this.cityService.getAllCityByExternalId(username);
      await this.cacheManager.set(cacheName, cities);
    }

    return {
      statusCode: HttpStatus.OK,
      content: { cities },
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':externalId')
  async getCityByExternalId(@Param('externalId') externalId: string) {
    return this.cityService.findCityByExternalId(externalId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCity(@Req() req: RequestWithUser, @Body() body: CreateCityDto) {
    const username = req.user.username;
    const cacheName = getCitiesCacheKey(username);

    const newCity = await this.cityService.createCity(body, username);

    this.cacheManager.del(cacheName);

    return {
      statusCode: HttpStatus.CREATED,
      content: { newCity },
    };
  }
}
