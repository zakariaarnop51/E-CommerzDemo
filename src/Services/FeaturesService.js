const FeaturesModel =require("../Models/Featurmodels")
const mongoose = require("mongoose");
let ObjectID = mongoose.Types.ObjectId;
exports.FeaturesReadService=async ()=>{
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}
