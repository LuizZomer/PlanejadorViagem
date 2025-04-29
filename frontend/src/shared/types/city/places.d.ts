interface IPlace {
  name: string;
  description: string;
  longitude: string;
  latitude: string;
}

interface IFindPlaceByCityOutput {
  city: string;
  description: string;
  country: string;
  spendingLevel: string;
  places: IPlace[];
}
