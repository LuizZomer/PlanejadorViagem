import { Plan, TouristActivity, TripDay } from '@prisma/client';

interface IActivities extends Omit<TouristActivity, 'id' | 'tripDayId'> {}

interface ITripDay extends Omit<TripDay, 'id' | 'planId'> {
  activities: IActivities[];
}

export interface IFindPlanByExternalIdOutput
  extends Omit<Plan, 'id' | 'userId' | 'organizationId'> {
  tripDay: ITripDay[];
}
