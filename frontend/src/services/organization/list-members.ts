import { api } from "../axios";

export interface IOrgMember {
  externalId: string;
  username: string;
}

export const listOrganizationMembers = async (
  organizationId: string
): Promise<IOrgMember[]> => {
  const res = await api.get(`/organization/${organizationId}/members`);
  return res.data.members ?? res.data;
};
