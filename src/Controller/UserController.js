const {UserLoginService, SaveProfileService, UserVerifyLoginServiec, ReadProfileService, } = require("../Services/UserService");



exports.UserLogin=async (req,res)=>{
let result = await UserLoginService(req);
return res.status(200).json(result)

}


exports.UserVerifyLogin = async (req, res) => {
    try {
        let result = await UserVerifyLoginServiec(req);

        if (result["status"] === "success") {
            let cookieOption = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: false,

                
            };

             res.cookie("token", result["token"], cookieOption);
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error in UserVerifyLogin:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


exports.UserLogOut=async (req,res)=>{
    let CookieOption={
        expires:new Date(Date.now()-24*6060*1000),
        httponly:false,
    }
    res.cookie("token","",CookieOption);
    return res.status(200).json({
        status:"Success",
        message:"LogOut Success"
    })
}


exports.CreatProfile=async (req,res)=>{
    let result = await SaveProfileService(req)
    return res.status(200).json(result)
}
exports.UpdateProfile=async (req,res)=>{
    let  result=await SaveProfileService(req);
    return res.status(200).json(result)


}
exports.ReadProfile=async (req,res)=>{
    let  result=await ReadProfileService(req);
    return res.status(200).json(result)
}
