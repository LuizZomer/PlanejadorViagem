import { Injectable } from '@nestjs/common';
import { SearchPlacesByCityUseCase } from './use-case/search-places-by-city.use-case';

@Injectable()
export class OpenAiService {
  constructor(
    private readonly searchPlaceByCityUseCase: SearchPlacesByCityUseCase,
  ) {}

  async searchPlacesByCity(city: string) {
    return this.searchPlaceByCityUseCase.execute(city);
  }
}
