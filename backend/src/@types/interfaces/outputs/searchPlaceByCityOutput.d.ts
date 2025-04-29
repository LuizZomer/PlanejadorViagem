import { City, Place } from '@prisma/client';

export interface ISearchPlaceByCityOutput
  extends Pick<City, 'country' | 'description' | 'name' | 'spendingLevel'> {
  places: Pick<Place, 'description' | 'latitude' | 'longitude' | 'name'>;
}
