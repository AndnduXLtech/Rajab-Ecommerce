import { ofetch } from "ofetch";
import { useAuth } from "../../hooks/Auth-provider";

const devURL = import.meta.env?.VITE_BASE_URL_DEV;
const prodURL = import.meta.env?.VITE_BASE_URL_PROD;
const url = import.meta.env?.DEV ? devURL : prodURL;

console.log(url);
const baseURL = `${url}/api`;

export const api = ofetch.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { token, logout } = useAuth();

  return ofetch.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    async onResponseError({ response }) {
      if (response?.status === 401) {
        logout();
      }
    },
  });
};
