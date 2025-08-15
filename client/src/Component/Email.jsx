import React from 'react'

function Email() {
    return (
        <div>
            <h1>Enter Your Email</h1>
            <p>A verification code will be the email address your provide</p>
            <input type="text" placeholder='Email address' />
            <button className='btn btn-primary'>Send Code</button>
        </div>
    )
}

export default Email
