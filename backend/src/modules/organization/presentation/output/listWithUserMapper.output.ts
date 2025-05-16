import { Organization, OrganizationUsers, User } from '@prisma/client';

interface IOrganizationUsers extends Pick<OrganizationUsers, 'organizationId'> {
  user: Pick<User, 'externalId' | 'username'>;
}

export interface IListWithUserMapperOutput
  extends Pick<Organization, 'createdAt' | 'name' | 'externalId'> {
  organizationUsers: IOrganizationUsers[];
}
