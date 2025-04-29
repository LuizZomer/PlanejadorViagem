import { api } from "../axios";

export const createCity = async (data: IFindPlaceByCityOutput) => {
  try {
    const res = await api.post("/city", { ...data, name: data.city });

    console.log(res.data);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
