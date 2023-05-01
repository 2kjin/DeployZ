import axios from "axios";

const api = axios.create({
  baseURL: `localhost:5173/`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default api;
