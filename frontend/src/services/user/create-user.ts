import { TSignup } from "../../screen/SingUp";
import { api } from "../axios";

export const createUser = async (
  userData: Omit<TSignup, "confirmPassword" | "preferences"> & {
    preferences: number[];
  }
) => {
  const res = await api.post("/user", userData);

  return res.data;
};
