import { api } from "../axios";

export const getAllPreferences = async (): Promise<Preference[]> => {
  const res = await api.get("/preference");

  return res.data;
};
