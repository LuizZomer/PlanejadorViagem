import { Organization, Plan, User } from '@prisma/client';

export interface OrganizationWithPlanOutput extends Organization {
  owner: User;
  plan: Plan[];
  organizationUsers: {
    user: User;
  }[];
}
