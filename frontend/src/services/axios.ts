import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.0.102:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});