import { Injectable } from '@nestjs/common';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';

@Injectable()
export class FindByExternalIdWithPlanUseCase {
  constructor(private readonly organizationGateway: OrganizationGateway) {}

  execute(externalId: string) {
    return this.organizationGateway.findByExternalIdWithPlan(externalId);
  }
}
