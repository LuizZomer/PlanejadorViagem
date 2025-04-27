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
        places: openAiReponse.places,
      },
    };
  }
}
