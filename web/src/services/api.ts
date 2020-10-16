import axios from "axios";
import { api_uri } from ".";
import { store } from "../redux/configureStore";

const api = axios.create({
  baseURL: api_uri,
  timeout: 6000,
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().session.token;

  if (!!token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  return config;
});

export { api };
