import { api } from "../axios";

interface IFindPlaceById {
  country: string;
  spendingLevel: string;
  city: string;
}

export const findPlaceByCity = async ({
  city,
  country,
  spendingLevel,
}: IFindPlaceById): Promise<IFindPlaceByCityOutput> => {
  const res = await api.get("/ia/places", {
    params: {
      spendingLevel,
      country,
      city,
    },
  });

  return res.data.content;
};
