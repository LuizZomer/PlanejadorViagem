import { ISearchPlaceByCityOutput } from 'src/@types/interfaces/outputs/searchPlaceByCityOutput';
import { ISuggestCitiesByDescriptionOutput } from 'src/@types/interfaces/outputs/suggestCitiesByDescriptionOutput';

export class OpenAIInterface {
  searchPlaceByCity: (
    city: string,
    country: string,
    spendingLevel: string,
  ) => Promise<ISearchPlaceByCityOutput>;

  suggestCityByDescription: (
    description: string,
    spendingLevel: string,
  ) => Promise<ISuggestCitiesByDescriptionOutput>;
}
