import axios from 'axios';
import { useDispatch } from 'react-redux';
import { handleTokenExpiration } from './authUtils'; // Path to your utility function for token expiration handling

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to check token expiry before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or sessionStorage
    const dispatch = useDispatch();

    // Check if the token is expired before making the request
    handleTokenExpiration(token, dispatch); // Handles token expiration and logout

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
