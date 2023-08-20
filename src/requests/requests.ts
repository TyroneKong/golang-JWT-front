import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default axiosRequest;
