import { api } from "../axios";

export interface IOrganizationPlanning {
  externalId: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export const listOrganizationPlannings = async (
  organizationId: string
): Promise<IOrganizationPlanning[]> => {
  const res = await api.get(`/organization/${organizationId}/plannings`);
  return res.data.plannings ?? res.data;
};
