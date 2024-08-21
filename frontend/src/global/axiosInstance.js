import axios from "axios";
import {BASE_URL} from "./uri.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

async function getIP() {
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip
  } catch (error) {
    console.log(`error to get address`);
    return null;
  }
}

axiosInstance.interceptors.request.use(async config => {
  const ip = await getIP();
  if (ip) {
    config.headers['X-FORWARDED-FOR'] = ip;
  }
  return config; 
}, error => {
  return Promise.reject(error); 
})

export default axiosInstance;