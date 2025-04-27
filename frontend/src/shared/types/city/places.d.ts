interface IPlace {
  name: string;
  description: string;
  longitude: string;
  latitude: string;
}

interface IFindPlaceByCityOutput {
  city: string;
  places: IPlace[];
}
