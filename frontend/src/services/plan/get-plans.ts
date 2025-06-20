import { IPlan } from "../../shared/types/city/plan";
import { api } from "../axios";

export const getPlans = async (): Promise<IPlan[]> => {
  const res = await api.get("/plan");

  return res.data.content.plans;
};
