import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from '../presentation/dto/createOrganization.dto';
import { IListWithUserOutput } from '../presentation/output/listWithUser.output';

export class OrganizationGatewayInterface {
  create: (
    organizationData: CreateOrganizationDto,
    usersId: number[],
    ownerId: number,
  ) => Promise<Organization>;
  listWithUsers: (userId: number) => Promise<IListWithUserOutput[]>;
}
