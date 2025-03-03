import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CityService } from '../../domains/city.service';
import { CreateCityDto } from '../dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllCities() {
    const cities = await this.cityService.getAllCities();

    return {
      statusCode: HttpStatus.OK,
      content: { cities },
    };
  }

  @Post()
  async createCity(@Body() body: CreateCityDto) {
    const newCity = await this.cityService.createCity(body);

    return {
      statusCode: HttpStatus.CREATED,
      content: { newCity },
    };
  }
}
