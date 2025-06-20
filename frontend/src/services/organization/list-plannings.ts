import { api } from "../axios";

export interface IUser {
  externalId: string;
  username: string;
}

export interface IOrganizationUser {
  organizationId: number;
  userId: number;
  user: IUser;
}

export interface IPlanning {
  externalId: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export interface IOrganizationDetails {
  externalId: string;
  name: string;
  owner: IUser;
  plan: IPlanning[];
  organizationUsers: IOrganizationUser[];
  id: number;
  createdAt: string;
  ownerId: number;
}

export const getOrganizationDetails = async (
  organizationId: string
): Promise<IOrganizationDetails> => {
  const res = await api.get(`/organization/${organizationId}`);
  return res.data as IOrganizationDetails;
};
