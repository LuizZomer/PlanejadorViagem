import { api } from "../axios";

export const changeOrganizationMembers = async (
  organizationExternalId: string,
  usersExternalId: string[]
) => {
  const response = await api.patch(`/organization/members`, {
    organizationExternalId,
    usersExternalId,
  });
  return response.data;
};
