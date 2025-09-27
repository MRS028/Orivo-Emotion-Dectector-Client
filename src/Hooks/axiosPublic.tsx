import axios from "axios";
import type { AxiosInstance } from "axios";
import { useMemo } from "react";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: "https://orivo-emotion-detector-backend.vercel.app/",
});

const useAxiosPublic = (): AxiosInstance => {
  // useMemo ensures the same instance is returned across renders
  return useMemo(() => axiosPublic, []);
};

export default useAxiosPublic;
