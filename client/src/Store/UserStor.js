import axios from "axios";
import {create} from "zustand";
import {getEmail, setEmail} from "../Utility";

const UserStore = create((set) => ({

    isSubmitting: false,

    UserOtpReset: async (email) => {
        set({isSubmitting: true});
        const response = await axios.get(
            `http://localhost:5000/api/v1/UserOtp/${email}`
        );
        setEmail(email);
        if (response.data['status'] === "Success") {
            set({isSubmitting: false});
            return true;
        }

    },
    Data: false,
    UserOtpVerify: async (otp) => {
        try {
            set({isSubmitting: true});
            const email = getEmail();

            const response = await axios.get(
                `http://localhost:5000/api/v1/UserVerifyLogin/${email}/${otp}`,
                {withCredentials: true}   // ✅ cookie পাঠাবে এবং রিসিভ করবে
            );

            if (response.data.status === "success") {
              set({data:true})
                return true;
            } else {
                return false; 
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            return false;
        } finally {
            set({isSubmitting: false});
        }
    },

    

   


}));
export default UserStore;
