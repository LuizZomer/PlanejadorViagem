import { api } from "../axios";

type TListFriendshipRequest = "pending" | "accepted" | "recused";

export const listFriendshipRequest = async (status: TListFriendshipRequest) => {
  const res = await api.get("/friendship", {
    params: {
      status,
    },
  });

  return res.data.friendshipRequests;
};
