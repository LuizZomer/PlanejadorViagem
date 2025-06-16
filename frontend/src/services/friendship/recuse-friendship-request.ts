import { api } from "../axios";

export const recuseFriendshipRequest = async (
  friendshipId: string
): Promise<{ message: string }> => {
  const res = await api.patch(`/friendship/${friendshipId}/refused`);

  return res.data;
};
