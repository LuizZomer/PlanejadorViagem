import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

export const api = axios.create({
  baseURL: "http://192.168.1.7:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);

    Toast.show({
      type: "error",
      text1: "Erro",
      text2: error.response?.data.message,
    });
    return Promise.reject(error);
  }
);
