import { api } from "../axios";

export interface IOrganization {
  externalId: string;
  name: string;
  createdAt: string;
}

export const listOrganizations = async (): Promise<IOrganization[]> => {
  const res = await api.get("/organization");
  return res.data.content ?? res.data;
};
