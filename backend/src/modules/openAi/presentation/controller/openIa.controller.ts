import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { GetPlaceByCity } from '../dto/get-place-by-id.dto';
import { OpenAiService } from '../../domains/openAi.service';
import { GetCitiesByDescription } from '../dto/get-cities-by-suggest.dto';

@Controller('ia')
export class OpenIaController {
  constructor(private readonly openIaService: OpenAiService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('places')
  async getPlacesbyCity(
    @Query() { city, country, spendingLevel }: GetPlaceByCity,
  ) {
    const openAiReponse = await this.openIaService.searchPlacesByCity(
      city,
      country,
      spendingLevel,
    );

    return {
      statusCode: HttpStatus.OK,
      content: {
        city,
        country,
        spendingLevel,
        description: openAiReponse.description,
        places: openAiReponse.places,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('cities')
  async suggestCitiesByDescription(
    @Query() { description, spendingLevel }: GetCitiesByDescription,
  ) {
    const openAiReponse = await this.openIaService.suggestCitiesByDescription(
      description,
      spendingLevel,
    );

    return {
      statusCode: HttpStatus.OK,
      content: {
        description,
        spendingLevel,
        cities: openAiReponse.cities,
      },
    };
  }
}
