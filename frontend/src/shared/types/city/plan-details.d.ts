export interface IActivity {
  externalId: string;
  name: string;
  photoPath: string;
  longitude: string;
  latitude: string;
  description: string;
}

export interface ITripDay {
  externalId: string;
  weather: string;
  averageTemp: string;
  date: string;
  expense: string;
  activities: IActivity[];
}

export interface IPlanDetails {
  country: string;
  description: string;
  externalId: string;
  latitude: string;
  longitude: string;
  destination: string;
  endDate: string;
  startDate: string;
  hosting: string;
  spendingLevel: string;
  tripDay: ITripDay[];
}
