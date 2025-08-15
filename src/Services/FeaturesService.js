const FeaturesModel =require("../Models/Featurmodels")
const PolicyModel = require("../Models/Policy");


exports.FeaturesReadService=async ()=>{
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}





exports.PolicyReadService = async (req) => {
    try {
        let type = req.params.type;
        let machStage = { $match: { type: type } };
        let data = await PolicyModel.aggregate([machStage]);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", message: e.message };
    }
};

