interface IPlace {
  name: string;
  description: string;
  longitude: string;
  latitude: string;
}

interface IActivity {
  name: string;
}

interface IDay {
  date: string;
  expense: string;
  activities: IActivity[];
}

interface IFindPlaceByCityOutput {
  destination: string;
  country: string;
  days: IDay[];
  description: string;
  endDate: string;
  host: string;
  latitude: number;
  longitude: number;
  spendingLevel: string;
  startDate: string;
}
