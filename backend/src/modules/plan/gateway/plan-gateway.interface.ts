import { Plan } from '@prisma/client';
import { CreatePlanDto } from '../presentation/dto/create-plan.dto';
import { IPlanOutput } from '../presentation/types/output/plan.output';

export class PlanGatewayInterface {
  findAllPlans: (userId: number) => Promise<Plan[]>;
  createPlan: (cityData: CreatePlanDto, userId: number) => Promise<IPlanOutput>;
  findPlanByExternalId: (planExternalId: string) => Promise<Plan>;
}
