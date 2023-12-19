import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

API.defaults.withCredentials = true;
export default API;
