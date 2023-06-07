import axios from "axios";

// const BASE_URL = "http://localhost:9000/api";
const BASE_URL = "http://192.168.0.70:9000/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
