import { api } from "../axios";

export const getCities = async (): Promise<IGetCitiesResponse[]> => {
  const res = await api.get("/city");

  return res.data.content.cities;
};
