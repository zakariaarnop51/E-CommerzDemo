import Layout from "../Layout/Layout"
import UserStore from "../Store/UserStor.js";

function Email() {
    const { isSubmitting } = UserStore()
    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-12 align-content-center">
                        <h1>Enter Your Email</h1>
                        <p>A verification code will be the email address your provide</p>
                        <input type="text" placeholder='Email address' />
                        <button className='btn btn-primary'>{isSubmitting ? (<div >
                            <span className="spinner-border" role="status"></span>
                            <span className=" visible">Loading...</span>
                        </div>):(<span>Sine-UP</span>)}</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Email
