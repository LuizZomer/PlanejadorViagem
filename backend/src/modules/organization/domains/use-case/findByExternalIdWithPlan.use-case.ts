import { Injectable } from '@nestjs/common';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';
import { OrganizationWithPlanOutput } from '../../presentation/output/organizationWithPlan.output';

@Injectable()
export class FindByExternalIdWithPlanUseCase {
  constructor(private readonly organizationGateway: OrganizationGateway) {}

  async execute(externalId: string) {
    const orgWithPlan =
      await this.organizationGateway.findByExternalIdWithPlan(externalId);

    return this.organizationMapper(orgWithPlan);
  }

  organizationMapper(orgWithPlan: OrganizationWithPlanOutput) {
    return {
      externalId: orgWithPlan.externalId,
      name: orgWithPlan.name,
      owner: {
        externalId: orgWithPlan.owner.externalId,
        username: orgWithPlan.owner.username,
      },
      plan: orgWithPlan.plan,
      organizationUsers: orgWithPlan.organizationUsers.map((ou) => ({
        ...ou,
        user: {
          externalId: ou.user.externalId,
          username: ou.user.username,
        },
      })),
      id: orgWithPlan.id,
      createdAt: orgWithPlan.createdAt,
      ownerId: orgWithPlan.ownerId,
    };
  }
}
