import { api } from "../axios";

export const createCity = async (data: IFindPlaceByCityOutput) => {
  const res = await api.post("/city", { ...data, name: data.city });

  return res.data;
};
