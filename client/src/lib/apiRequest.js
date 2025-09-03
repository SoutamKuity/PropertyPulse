import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
  credentials: 'include', // added by gpt
});

export default apiRequest;