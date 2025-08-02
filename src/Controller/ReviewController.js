const {ReviewCreateService} = require("../Services/ReviewService");


exports.ReviewCreate=async (req,res)=>{
    let result =await ReviewCreateService(req)
    return res.status(200).json(result)
}