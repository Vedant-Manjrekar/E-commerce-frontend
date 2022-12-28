import axios from "axios";

const instance = axios.create({
  // baseURL: "https://backend-ucqv.onrender.com",
  baseURL: "http://localhost:3000",
});

export default instance;
