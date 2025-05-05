import { City, Place } from '@prisma/client';

export interface ICityWithPlaces extends City {
  Place: Place[];
}

export interface ICityWithPlacesMapper extends Omit<City, 'id' | 'userId'> {
  Place: Pick<
    Place,
    'description' | 'externalId' | 'latitude' | 'longitude' | 'name'
  >[];
}
