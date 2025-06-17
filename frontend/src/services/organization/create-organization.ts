import { api } from "../axios";

interface ICreateOrganizationInput {
  name: string;
  usersExternalId: string[];
}

export const createOrganization = async ({
  name,
  usersExternalId,
}: ICreateOrganizationInput) => {
  const res = await api.post("/organization", { name, usersExternalId });
  return res.data;
};
