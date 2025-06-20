import { IPlanDetails } from "../../shared/types/city/plan-details";
import { api } from "../axios";

export const planDetails = async (
  externalId: string
): Promise<IPlanDetails> => {
  const res = await api.get(`/plan/${externalId}`);

  return res.data;
};
