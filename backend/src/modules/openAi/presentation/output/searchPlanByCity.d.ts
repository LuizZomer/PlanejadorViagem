interface Activity {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  estimatedTime: string;
  photoPath?: string;
}

interface DayPlan {
  date: string; // Ex: "2025-11-20"
  expense: string; // ou number, se for numérico
  activities: Activity[];
}

interface ISearchPlanByCityOutput {
  destination: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
  host: string;
  days: DayPlan[];
}
