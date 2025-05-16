import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { IListWithUserOutput } from '../presentation/output/listWithUser.output';
import { OrganizationWithPlanOutput } from '../presentation/output/organizationWithPlan.output';

export class OrganizationGatewayInterface {
  create: (
    organizationData: CreateOrganizationDto,
    usersId: number[],
    ownerId: number,
  ) => Promise<Organization>;
  listWithUsers: (userId: number) => Promise<IListWithUserOutput[]>;
  findByExternalId: (externalId: string) => Promise<Organization | null>;
  findByExternalIdWithPlan: (
    externalId: string,
  ) => Promise<OrganizationWithPlanOutput | null>;
  changeOrganizationUser: (
    organizationId: number,
    usersId: number[],
  ) => Promise<void>;
}
