import { TLogin } from "../../screen/Login";
import { api } from "../axios";

export const login = async (data: TLogin) => {
    try {
    const res = await api.post("/auth/login", data);
    console.log("Ola");

    return res.data;
    } catch (error) {
    console.log(error);
    }
};