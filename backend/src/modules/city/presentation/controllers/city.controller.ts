import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CityService } from '../../domains/city.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/@types/interfaces/response';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

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
    const cities = await this.cityService.getAllCityByExternalId(username);

    return {
      statusCode: HttpStatus.OK,
      content: { cities },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCity(@Req() req: RequestWithUser, @Body() body: CreateCityDto) {
    const username = req.user.username;

    const newCity = await this.cityService.createCity(body, username);

    return {
      statusCode: HttpStatus.CREATED,
      content: { newCity },
    };
  }
}
