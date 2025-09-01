import axios from "axios";
import { create } from "zustand";
import { setEmail, getEmail } from "../Utility";
import Email from "../Component/Email";


const UserStore = create((set) => ({

  isSubmitting: false,

  UserOtpReset: async (email) => {
    set({ isSubmitting: true });
    const response = await axios.get(
      `http://localhost:5000/api/v1/UserOtp/${email}`
    );
    setEmail(email);
    if (response.data['status'] === "Success") {
      set({ isSubmitting: false });
        return true;    
    } 

  },
  UserOtpVerify: async (otp) => {
     set({ isSubmitting: true });
      let email = getEmail();
      const response = await axios.post(
        `http://localhost:5000/api/v1/UserVerifyLogin/${(email, otp)}`
      );
      if (response.status === "success") {
        set({ isSubmitting: false });
        return true;
      }
  },
}));
export default UserStore;
