import {jwtDecode} from "jwt-decode";

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true; // No token means expired or not logged in

  try {
    const decoded = jwtDecode(token); // Decode the JWT
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime; // If exp < now, token is expired
  } catch (error) {
    return true; // If decoding fails, consider token expired
  }
};
