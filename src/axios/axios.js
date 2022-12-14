import axios from "axios";

const instance = axios.create({
  baseURL: "https://vocal-eclair-a8b91f.netlify.app",
});

export default instance;
