interface IGetCityByDescription {
  description: string;
  spendingLevel: "baixo" | "medio" | "alto";
  cities: City[];
}

interface City {
  description: string;
  latitude: string;
  longitude: string;
  name: string;
  country: string;
  places: IPlace[];
}
