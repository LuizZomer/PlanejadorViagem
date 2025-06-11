import { api } from "../axios";

export const sendFriendRequest = async (
  userExternalId: string
): Promise<{ message: string }> => {
  const res = await api.post("/friendship", {
    receiveExternalId: userExternalId,
  });

  return res.data;
};
