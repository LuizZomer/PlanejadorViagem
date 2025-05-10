import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { OpenAiService } from '../../domains/openAi.service';
import { GetCitiesByDescription } from '../dto/get-cities-by-suggest.dto';
import { GetPlanByCity } from '../dto/get-plan-by-city.dto';

@Controller('ia')
export class OpenIaController {
  constructor(private readonly openIaService: OpenAiService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('places')
  async getPlacesbyCity(@Query() planData: GetPlanByCity) {
    const openAiReponse = await this.openIaService.searchPlanByCity(planData);

    return {
      statusCode: HttpStatus.OK,
      content: {
        ...openAiReponse,
        ////city: openAiReponse.name,
        //country: openAiReponse.country,
        //latitude: openAiReponse.latitude,
        //longitude: openAiReponse.longitude,
        //spendingLevel: ,
        //description: openAiReponse.description,
        //places: openAiReponse.places,
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
