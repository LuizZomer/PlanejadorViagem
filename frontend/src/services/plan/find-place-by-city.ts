import { api } from "../axios";

interface IFindPlaceById {
  country: string;
  spendingLevel: string;
  destination: string;
  startDate: string;
  endDate: string;
  hosting: boolean;
}

export const findPlaceByCity = async ({
  destination,
  country,
  spendingLevel,
  startDate,
  endDate,
  hosting,
}: IFindPlaceById): Promise<IFindPlaceByCityOutput> => {
  const res = await api.get("/ia/places", {
    params: {
      spendingLevel,
      country,
      destination,
      startDate,
      endDate,
      hosting,
    },
  });

  return res.data.content;
};
