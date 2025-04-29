import { Injectable } from '@nestjs/common';
import { SearchPlacesByCityUseCase } from './use-case/search-places-by-city.use-case';
import { SuggestCitiesByDescriptionUseCase } from './use-case/search-cities-by-description.use-case';

@Injectable()
export class OpenAiService {
  constructor(
    private readonly searchPlaceByCityUseCase: SearchPlacesByCityUseCase,
    private readonly suggestCitiesByDescriptionUseCase: SuggestCitiesByDescriptionUseCase,
  ) {}

  async searchPlacesByCity(
    city: string,
    country: string,
    spendingLevel: string,
  ) {
    return this.searchPlaceByCityUseCase.execute(city, country, spendingLevel);
  }

  async suggestCitiesByDescription(description: string, spendingLevel: string) {
    return this.suggestCitiesByDescriptionUseCase.execute(
      description,
      spendingLevel,
    );
  }
}
