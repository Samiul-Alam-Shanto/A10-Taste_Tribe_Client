import axios from "axios";
import useAuth from "../useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    });
    return instance.interceptors.request.eject(requestInterceptor);
  }, [user]);

  return instance;
};

export default useAxiosSecure;
