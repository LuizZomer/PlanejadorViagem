import { PlanGateway } from '../../gateway/plan-gateway.prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePlanUseCase {
  constructor(private readonly planGateway: PlanGateway) {}

  async execute(planExternalId: string) {
    return this.planGateway.deletePlan(planExternalId);
  }
}
