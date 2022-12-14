import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-ucqv.onrender.com",
});

export default instance;
