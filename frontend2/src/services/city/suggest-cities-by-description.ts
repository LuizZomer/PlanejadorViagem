import { SuggestCityFormData } from "../../screen/SuggestCities";
import { api } from "../axios";

export const suggestCitiesByDescription = async ({
  description,
  spendingLevel,
}: SuggestCityFormData) => {
  const res = await api.get("/ia/cities", {
    params: {
      spendingLevel,
      description,
    },
  });

  return res.data.content;
};
