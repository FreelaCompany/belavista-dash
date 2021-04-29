import axios from "axios";

const headers = {
  Accept: "application/json",
};

const api = axios.create({
  // baseURL: "http://ubamoveis-api.herokuapp.com",
  baseURL: "http://localhost:3333",
  headers,
});

export default api;
