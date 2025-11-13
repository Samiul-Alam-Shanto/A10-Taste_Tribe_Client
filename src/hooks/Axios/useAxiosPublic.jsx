import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

// import.meta.env.VITE_API_URL

// VITE_API_URL=http://localhost:5000
// VITE_API_URL=https://taste-tribe-server-rouge.vercel.app
