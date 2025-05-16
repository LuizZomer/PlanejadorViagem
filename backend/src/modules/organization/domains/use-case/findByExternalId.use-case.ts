import { Injectable } from '@nestjs/common';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';

@Injectable()
export class FindByExternalIdUseCase {
  constructor(private readonly organizationGateway: OrganizationGateway) {}
  async execute(externalId: string) {
    return this.organizationGateway.findByExternalId(externalId);
  }
}
