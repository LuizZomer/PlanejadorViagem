import { BadRequestException, Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { OrganizationGateway } from '../../gateway/organizationGateway.prisma';

@Injectable()
export class DeleteOrganizationUseCase {
  constructor(private readonly organizationGateway: OrganizationGateway) {}

  async execute(organizationExternalId: string): Promise<Organization> {
    const org = await this.organizationGateway.findByExternalId(
      organizationExternalId,
    );

    if (!org) throw new BadRequestException('Organização não encontrada!');

    return this.organizationGateway.deleteOrganization(org.id);
  }
}
