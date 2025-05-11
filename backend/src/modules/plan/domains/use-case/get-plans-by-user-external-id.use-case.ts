import { Injectable } from '@nestjs/common';
import { PlanGateway } from '../../gateway/plan-gateway.prisma';
import { UserService } from 'src/modules/user/domains/user.service';
import { Plan } from '@prisma/client';

@Injectable()
export class GetPlansByUserExternalIdUseCase {
  constructor(
    private readonly planGateway: PlanGateway,
    private readonly userService: UserService,
  ) {}

  async execute(username: string) {
    const user = await this.userService.findOneByUsername(username);

    const plans = await this.planGateway.findAllPlans(user.id);

    return this.citiesMapper(plans);
  }

  citiesMapper(cities: Plan[]): IFindAllPlansOutput[] {
    return cities.map(
      ({
        country,
        description,
        externalId,
        destination,
        spendingLevel,
        endDate,
        hosting,
        startDate,
      }) => ({
        country,
        description,
        externalId,
        destination,
        endDate,
        startDate,
        hosting,
        spendingLevel,
      }),
    );
  }
}
