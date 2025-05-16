import { Injectable } from '@nestjs/common';
import { PlanGateway } from '../../gateway/plan-gateway.prisma';
import { Organization } from '@prisma/client';
import { OrganizationService } from 'src/modules/organization/domains/organization.service';

@Injectable()
export class ChangePlanOrganizationUseCase {
  constructor(
    private readonly planGateway: PlanGateway,
    private readonly organizationService: OrganizationService,
  ) {}

  async execute(organizationExternalId: string | null, planExternalId: string) {
    let org: Organization | null = null;
    if (organizationExternalId) {
      org = await this.organizationService.findByExternalId(
        organizationExternalId,
      );
    }

    console.log(org);

    return this.planGateway.changePlanOrganization(
      org?.id || null,
      planExternalId,
    );
  }
}
