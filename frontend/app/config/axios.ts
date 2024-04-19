import axios from "axios";

const api = axios.create({
  baseURL: "http//:172.28.158.213:8081",
  withCredentials: true,
});

export default api;
