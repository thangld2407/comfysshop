import axios from "axios";
export const axiosClient = axios.create({
    baseURL: 'https://course-api.com/react-store-products',
    headers: { 'Content-Type': 'application/json'}
  });