import axios from "axios"; //NEXT_PUBLIC_PROD_BASE_URL   NEXT_PUBLIC_PROD_BASE_URL

const BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL ;

export const api = axios.create({
  baseURL: BASE_URL,
});

//Setting the Token using interceptor
api.interceptors.request.use((config) => {
  const authToken = JSON.parse(localStorage.getItem("session"));
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
