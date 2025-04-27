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

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllCities() {
    const cities = await this.cityService.getAllCities();

    return {
      statusCode: HttpStatus.OK,
      content: { cities },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCity(@Req() req: RequestWithUser, @Body() body: CreateCityDto) {
    const username = req.user.username;

    console.log('userId controller', username);

    const newCity = await this.cityService.createCity(body, username);

    return {
      statusCode: HttpStatus.CREATED,
      content: { newCity },
    };
  }
}
