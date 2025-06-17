import { IFriendRequest } from "../../screen/FriendsScreen";
import { api } from "../axios";

type TListFriendshipRequest = "pending" | "accept" | "recused";

export const listFriendshipRequest = async (
  status: TListFriendshipRequest
): Promise<IFriendRequest[]> => {
  const res = await api.get("/friendship", {
    params: {
      status,
    },
  });

  console.log(res.data);

  return res.data.friendshipRequests;
};
