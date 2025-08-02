const { FeaturesReadService} = require("../Services/FeaturesService");

exports.FeaturesRead=async (req,res)=>{
    let result =await FeaturesReadService()
    return res.status(200).json(result)
}
