import { Organization, OrganizationUsers, User } from '@prisma/client';

interface IOrganizationUsers extends OrganizationUsers {
  user: User;
}

export interface IListWithUserOutput extends Organization {
  organizationUsers: IOrganizationUsers[];
}
