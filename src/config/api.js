import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.43.204:5003/api/v1",
});
