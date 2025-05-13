import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';

export class OrganizationGatewayInterface {
  create: (organizationData: CreateOrganizationDto) => Promise<Organization>;
}
