import { api } from "../axios";

export const findAll = async (): Promise<{
  externalId: string;
  username: string;
}> => {
  const res = await api.get("/user");

  return res.data;
};
