import Layout from "../Layout/Layout"
import UserStore from "../Store/UserStor.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Otp from './Otp';

function Otp() {
    const { isSubmitting, UserOtpReset } = UserStore()
    const [otp, setOtp] = useState("");
    const navigator = useNavigate();

    console.log(email);


    const handleEmailSubmit = async () => {
        if (otp.length !== 6) {
            return alert("Invalid Otp");
        }

        let res = await UserOtpVerify(otp);
        console.log(res);


        if (res) {
            // Redirect to OTP verification page
            navigator("/");
        } else {
            alert("Failed to send OTP. Please try again.");
        }



    }


    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12 align-content-center">
                        <h1>Enter Your Email</h1>
                        <p>A verification code will be the email address your provide</p>
                        <input onChange={(e) => { setOtp(e.target.value) }} type="text" placeholder='Type Otp' />
                        <button onClick={handleEmailSubmit} className='btn btn-primary'>{isSubmitting ? (<div >
                            <span className="spinner-border" role="status"></span>
                            <span className=" visible">Loading...</span>
                        </div>) : (<span>Sine-UP</span>)}</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Otp;
