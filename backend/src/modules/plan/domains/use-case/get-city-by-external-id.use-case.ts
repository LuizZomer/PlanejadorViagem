import { Injectable } from '@nestjs/common';
import { PlanGateway } from '../../gateway/plan-gateway.prisma';
import { IPlanOutput } from '../../presentation/types/output/plan.output';
import { IFindPlanByExternalIdOutput } from '../../presentation/types/output/findPlanbyExternalId';

@Injectable()
export class GetCityByExternalId {
  constructor(private readonly planGateway: PlanGateway) {}

  async execute(cityExternalId: string) {
    const plan = await this.planGateway.findPlanByExternalId(cityExternalId);

    return this.cityMapper(plan);
  }

  cityMapper(city: IPlanOutput): IFindPlanByExternalIdOutput {
    return {
      country: city.country,
      description: city.description,
      externalId: city.externalId,
      latitude: city.latitude,
      longitude: city.longitude,
      destination: city.destination,
      endDate: city.endDate,
      startDate: city.startDate,
      hosting: city.hosting,
      spendingLevel: city.spendingLevel,
      tripDay: city.TripDay.map(
        ({ weather, externalId, averageTemp, activities, date, expense }) => ({
          externalId,
          weather,
          averageTemp,
          date,
          expense,
          activities: activities.map(
            ({
              description,
              externalId,
              latitude,
              longitude,
              name,
              photoPath,
            }) => ({
              externalId,
              name,
              photoPath,
              longitude,
              latitude,
              description,
            }),
          ),
        }),
      ),
    };
  }
}
