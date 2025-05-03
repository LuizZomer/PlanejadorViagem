import { TSignup } from "../../screen/SingUp";
import { api } from "../axios";

export const createUser = async (
  userData: Omit<TSignup, "confirmPassword">
) => {
  const res = await api.post("/user/register", userData);

  return res.data;
};
