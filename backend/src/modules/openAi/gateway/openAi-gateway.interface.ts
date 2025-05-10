import { ISearchPlaceByCityOutput } from 'src/@types/interfaces/outputs/searchPlaceByCityOutput';
import { ISuggestCitiesByDescriptionOutput } from 'src/@types/interfaces/outputs/suggestCitiesByDescriptionOutput';
import { GetPlanByCity } from '../presentation/dto/get-plan-by-city.dto';

export class OpenAIInterface {
  searchPlanByCity: (
    planData: GetPlanByCity,
  ) => Promise<ISearchPlanByCityOutput>;

  suggestCityByDescription: (
    description: string,
    spendingLevel: string,
  ) => Promise<ISuggestCitiesByDescriptionOutput>;
}
