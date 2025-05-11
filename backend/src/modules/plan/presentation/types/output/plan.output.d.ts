import { Plan, TouristActivity, TripDay } from '@prisma/client';

interface ITripDay extends TripDay {
  activities: TouristActivity[];
}

export interface IPlanOutput extends Plan {
  TripDay: ITripDay[];
}
