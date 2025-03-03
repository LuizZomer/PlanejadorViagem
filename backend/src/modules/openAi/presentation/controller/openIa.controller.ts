import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { GetPlaceByCity } from '../dto/get-place-by-id.dto';
import { OpenAiService } from '../../domains/openAi.service';

@Controller('ia')
export class OpenIaController {
  constructor(private readonly openIaService: OpenAiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('places')
  async getPlacesbyCity(@Body() { city }: GetPlaceByCity) {
    return this.openIaService.searchPlacesByCity(city);
  }
}
