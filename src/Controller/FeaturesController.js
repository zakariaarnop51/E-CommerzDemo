const { FeaturesReadService, LegalReadService, PolicyReadService, AboutReadService, TermsReadService} = require("../Services/FeaturesService");

exports.FeaturesRead=async (req,res)=>{
    let result =await FeaturesReadService()
    return res.status(200).json(result)
}

exports.LegalRead=async (req,res)=>{
    let result =await LegalReadService(req)
    return res.status(200).json(result)
}

exports.PolicyRead=async (req,res)=>{
    let result =await PolicyReadService(req)
    return res.status(200).json(result)
}

exports.AboutRead=async (req,res)=>{
    let result =await AboutReadService(req)
    return res.status(200).json(result)
}

exports.TremsRead=async (req,res)=>{
    let result =await TermsReadService(req)
    return res.status(200).json(result)
}
