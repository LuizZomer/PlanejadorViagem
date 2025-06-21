import { SuggestCityFormData } from "../../screen/SuggestCities";
import { api } from "../axios";

export const suggestCitiesByDescription = async ({
  description,
  spendingLevel,
}: Pick<
  SuggestCityFormData,
  "description" | "spendingLevel"
>): Promise<IGetCityByDescription> => {
  const res = await api.get("/ia/cities", {
    params: {
      spendingLevel,
      description,
    },
  });

  return res.data.content;
};
