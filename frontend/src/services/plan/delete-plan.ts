import { api } from "../axios";

export const deletePlan = async (planExternalId: string) => {
  const res = await api.delete(`/plan/${planExternalId}`);

  return res.data;
};
