import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { GetPlaceByCity } from '../dto/get-place-by-id.dto';
import { OpenAiService } from '../../domains/openAi.service';
import { Response } from 'express';

@Controller('ia')
export class OpenIaController {
  constructor(private readonly openIaService: OpenAiService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('places')
  async getPlacesbyCity(@Body() { city, country }: GetPlaceByCity) {
    const openAiReponse = await this.openIaService.searchPlacesByCity(
      city,
      country,
    );

    return {
      statusCode: HttpStatus.OK,
      content: {
        city,
        places: openAiReponse.places,
      },
    };
  }
}
