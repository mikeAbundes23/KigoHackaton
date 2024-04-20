import axios from "axios";

const api = axios.create({
  // baseURL: "http//:172.28.158.213:8081",
  baseURL: "http://192.168.1.200:8000",
  // baseURL: "http://172.20.10.7:5000"
});

export default api;
