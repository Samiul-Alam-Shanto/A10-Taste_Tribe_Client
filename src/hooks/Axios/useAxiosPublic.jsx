import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://taste-tribe-server-rouge.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
