import { City, Place } from '@prisma/client';

export interface ICitiesSuggest extends Pick<City, 'description' | 'name'> {
  places: Pick<Place, 'description' | 'latitude' | 'longitude' | 'name'>[];
}

export interface ISuggestCitiesByDescriptionOutput {
  cities: ICitiesSuggest[];
}
