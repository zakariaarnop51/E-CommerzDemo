const nodemailer=require('nodemailer')

exports.EmailSend =async (EmailTo,EmailSubject,EmailText)=>{
    let Transport =nodemailer.createTransport({
        host:"SMTP.gmail.com",
        port:25,
        secure:true,
        service:"gmail",
        tls:{rejectUnauthorized:true},

        auth:{
            user:'zakariaengineer4@gmail.com',
            pass:'awvhrjqwvnkhdwoy'
        }
    });
    let emailOption ={
        from:"MERN-Ecommerce-Otp<zakariaengineer4@gmail.com>",
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    };
    return await Transport.sendMail(emailOption);
}
