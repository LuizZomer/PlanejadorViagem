import { api } from "../axios";

export const createPlan = async (data: IFindPlaceByCityOutput) => {
  const res = await api.post("/plan", { ...data });

  return res.data;
};
