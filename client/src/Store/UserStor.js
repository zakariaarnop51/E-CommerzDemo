import axios from "axios";
import { create } from "zustand";
import { setEmail , getEmail } from "../Utility";
const UserStore = create((set) => ({
    UserOtpReset: async (email) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/UserOtp/${email}`);
             setEmail(email);
            if (response.status === "Success") {
                return true;
            } else {
                throw new Error("Failed to send OTP reset");
            }
        } catch (error) {
            console.error("Error sending OTP reset:", error);
            throw error;
        }
    },
    UserOtpVerify: async (otp) => {
        try {
            let email = getEmail();
            const response = await axios.post(`http://localhost:5000/api/v1/UserVerifyLogin/${ email, otp }`);
            if (response.status === "Success") {
                return true;
            } else {
                throw new Error("Failed to verify OTP");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        }
    },





}))
export default UserStore;