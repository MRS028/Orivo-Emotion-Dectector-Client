import axios from "axios";

// In your axiosPrivate configuration
const axiosPrivate = axios.create({
  baseURL: "https://orivo-emotion-detector-backend.vercel.app/api", // Make sure this matches your server
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPrivate;
