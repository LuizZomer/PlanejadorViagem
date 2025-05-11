import { Plan, TouristActivity, TripDay } from '@prisma/client';

export interface ICreatePlanMapperOutput
  extends Pick<
    Plan,
    | 'description'
    | 'country'
    | 'destination'
    | 'endDate'
    | 'startDate'
    | 'externalId'
    | 'spendingLevel'
  > {}
