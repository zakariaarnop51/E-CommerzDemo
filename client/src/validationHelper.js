import axios from "axios";
import Cookies from "js-cookie";

export const isValidEmail = (email) => {
  // ✅ Regex for validating email format
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Login check
export const isLogin = () => {
  const token = Cookies.get("token");
  return !!token; // token থাকলে true, না থাকলে false
};

// Logout
export const Logout = async () => {
  const res = await axios.get(`http://localhost:5000/api/v1/UserLogOut`, {
    withCredentials: true,
  });
  if (res.data["status"] == "Success") {
    sessionStorage.clear();
    Cookies.remove("token");
    window.location.href = "/";
  }
};
