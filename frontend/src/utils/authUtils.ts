import { jwtDecode } from 'jwt-decode';  // Use jwt-decode to decode the token
import { logout } from '../redux/userSlice';
// Utility function to check if the token is expired
const isTokenExpired = (token: string | null): boolean => {
  if (!token){ console.log("token test failed");return true;} // If there's no token, it's considered expired
  const decodedToken: any = jwtDecode(token);
  console.log("decodedToken",decodedToken);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime;
};

// Logout if token is expired
const handleTokenExpiration = (token: string | null, dispatch: any) => {
    if (isTokenExpired(token)) {
      // Dispatch logout action
      dispatch(logout());
      // Optionally, clear token from localStorage/sessionStorage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Show an alert or redirect to the login page
      alert('Session expired. Please log in again.');
      window.location.href = '/login'; // Redirect to login page
    }
  };
  
  export { isTokenExpired, handleTokenExpiration };