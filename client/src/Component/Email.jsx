import Layout from "../Layout/Layout"
import UserStore from "../Store/UserStor.js";
import {isValidEmail} from "../validationHelper.js"
import { useState } from "react";

function Email() {
    const { isSubmitting,UserOtpReset } = UserStore()
    const [email, setEmail] = useState("");
    console.log(email);
    
    const handleEmailSubmit = async () => {
        if (!isValidEmail(email)){
           return alert("Invalid Email Address");
        }else{
              await UserOtpReset(email);
                // if (success === true) {
                //     // Redirect to OTP verification page
                //    navigator("/otp");
                // } else {
                //     alert("Failed to send OTP. Please try again.");
                // }
        }
    
    }


    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12 align-content-center">
                        <h1>Enter Your Email</h1>
                        <p>A verification code will be the email address your provide</p>
                        <input onChange={(e)=>{ setEmail(e.target.value)}} type="text" placeholder='Email address' />
                        <button onClick={handleEmailSubmit} className='btn btn-primary'>{isSubmitting ? (<div >
                            <span className="spinner-border" role="status"></span>
                            <span className=" visible">Loading...</span>
                        </div>):(<span>Sine-UP</span>)}</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Email;
