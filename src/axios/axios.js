import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-backend-tsvb.onrender.com",
});

export default instance;
