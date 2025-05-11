//import { TCreateCity } from 'src/@types/types/create-city.type';
import { PlanGateway } from '../../gateway/plan-gateway.prisma';
import { CreatePlanDto } from '../../presentation/dto/create-plan.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/domains/user.service';
import { ICreatePlanMapperOutput } from '../../presentation/types/output/create-plan.output';
import { IPlanOutput } from '../../presentation/types/output/plan.output';

@Injectable()
export class CreatePlanWithDaysUseCase {
  constructor(
    private readonly planGateway: PlanGateway,
    private readonly userService: UserService,
  ) {}

  async execute(planData: CreatePlanDto, username: string) {
    const user = await this.userService.findOneByUsername(username);

    const plans = await this.planGateway.createPlan(planData, user.id);

    return this.createPlanMapper(plans);
  }

  createPlanMapper({
    endDate,
    startDate,
    description,
    destination,
    country,
    externalId,
    spendingLevel,
  }: IPlanOutput): ICreatePlanMapperOutput {
    return {
      country,
      description,
      destination,
      endDate,
      externalId,
      spendingLevel,
      startDate,
    };
  }
}
