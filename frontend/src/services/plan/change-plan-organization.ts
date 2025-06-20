import { api } from "../axios";

export const changePlanOrganization = async (
  planExternalId: string,
  organizationExternalId: string
) => {
  const { data } = await api.patch(
    `/plan/${planExternalId}/${organizationExternalId}`
  );

  return data;
};
