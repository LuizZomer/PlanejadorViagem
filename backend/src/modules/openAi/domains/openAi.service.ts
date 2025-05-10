import { Injectable } from '@nestjs/common';
import { SearchPlanByCityUseCase } from './use-case/search-plan-by-city.use-case';
import { SuggestCitiesByDescriptionUseCase } from './use-case/search-cities-by-description.use-case';
import { GetPlanByCity } from '../presentation/dto/get-plan-by-city.dto';

@Injectable()
export class OpenAiService {
  constructor(
    private readonly searchPlaceByCityUseCase: SearchPlanByCityUseCase,
    private readonly suggestCitiesByDescriptionUseCase: SuggestCitiesByDescriptionUseCase,
  ) {}

  async searchPlanByCity(planData: GetPlanByCity) {
    return this.searchPlaceByCityUseCase.execute(planData);
  }

  async suggestCitiesByDescription(description: string, spendingLevel: string) {
    return this.suggestCitiesByDescriptionUseCase.execute(
      description,
      spendingLevel,
    );
  }
}
