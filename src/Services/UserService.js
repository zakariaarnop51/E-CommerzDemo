const {EmailSend} = require("../Utility/EmailHelper");
const UserModel =require("../Models/Usermodels");
const {EncodeToken} = require("../Utility/TokenHelper");
const ProfileModel = require("../Models/ProfileModels");
//const mongoose = require("mongoose");
//const ObjectId=mongoose.Types.ObjectId;

exports.UserLoginService=async (req)=>{
    try {
        let EmailTo = req.params.email;
        let code =Math.floor(100000+Math.random()*900000);
        let EmailText =`Your verification Code is = ${code}`;
        let EmailSubject="Email Verification";
        await EmailSend(EmailTo,EmailSubject,EmailText);
        await UserModel.updateOne({email:EmailTo},{$set:{otp:code}},{upsert:true});
        return {status:"Success",message:"6 Digit OTp has been send"};

    }catch (e) {
        return {status:"Fail",message:"SomeThing Went Wrong"};
    }
};

exports.UserVerifyLoginServiec = async (req) => {
    try {
        let email=req.params.Email;
        let otp=req.params.Otp;

        // User Count
        let total=await UserModel.find({email:email,otp:otp}).countDocuments(['total']);
        if(total===1){

            // User ID Read
            let user_id=await UserModel.find({email:email,otp:otp}).select("_id");
            console.log(user_id)
            console.log(user_id[0]['_id'])
            console.log(email,user_id[0]['_id'].toString())

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success", message:"Valid OTP",token:token}

        }
        else{
            return {status:"fail", message:"Invalid OTP"}
        }

    }catch (e) {
        return {status:"fail", message:"Invalid OTP"}
    }
};


exports.SaveProfileService=async (req)=>{

    let user_id= req.headers.user_id;
    let reqBody=req.body;
    reqBody.userID=user_id;
    await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
    return{status:"Success",message:"Save Success"}
}
exports.ReadProfileService=async (req)=>{
    let user_id= req.headers.user_id;
    let data = await ProfileModel.find({userID:user_id})
    return{status:"success",data:data}

}
