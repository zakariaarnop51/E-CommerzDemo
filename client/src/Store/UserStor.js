import axios from "axios";
import { create } from "zustand";
const UserStore = create((set) => ({
    UserOtpReset: async (email) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/UserOtp/${email}`);
            if (response.status === "Success") {
                return true;
            } else {
                throw new Error("Failed to send OTP reset");
            }
        } catch (error) {
            console.error("Error sending OTP reset:", error);
            throw error;
        }
    }
}))
export default UserStore;