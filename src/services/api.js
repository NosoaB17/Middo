import axios from "axios";

const API_URL = "https://vercel-server-three-chi.vercel.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
