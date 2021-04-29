import axios from "axios";

const headers = {
  Accept: "application/json",
};

const api = axios.create({
  // baseURL: "http://localhost:3333/",
  baseURL: "https://casabelavista-api.herokuapp.com/",
  headers,
});

export default api;
