import { api } from "../axios";

/**
 * Remove an organization by its external id.
 * @param externalId identifier returned by backend
 */
export const deleteOrganization = async (
  externalId: string
): Promise<void> => {
  await api.delete(`/organization/${externalId}`);
};
