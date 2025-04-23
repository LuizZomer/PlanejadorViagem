import { TLogin } from "../../screen/Login";
import { api } from "../axios";

export const login = async (data: TLogin) => {
        const res = await api.post("/auth/login", data);
    
        return res.data.access_token;
    
};