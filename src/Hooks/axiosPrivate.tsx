import axios from "axios";

// In your axiosPrivate configuration
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPrivate;