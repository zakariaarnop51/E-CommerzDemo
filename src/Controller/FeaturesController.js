const { FeaturesReadService, LegalReadService, PolicyReadService, AboutReadService, TermsReadService} = require("../Services/FeaturesService");

exports.FeaturesRead=async (req,res)=>{
    let result =await FeaturesReadService()
    return res.status(200).json(result)
}



exports.PolicyRead=async (req,res)=>{
    let result =await PolicyReadService(req)
    return res.status(200).json(result)
}

