import { api } from "../axios";

export const acceptFriendshipRequest = async (
  friendshipId: string
): Promise<{ message: string }> => {
  const res = await api.patch(`/friendship/${friendshipId}/accept`);

  return res.data;
};
