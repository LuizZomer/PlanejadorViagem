import { UserFriendship } from "../../types/user";
import { api } from "../axios";

export const listAvaliableUser = async (): Promise<UserFriendship[]> => {
  const res = await api.get("/friendship/available-users");

  return res.data;
};
