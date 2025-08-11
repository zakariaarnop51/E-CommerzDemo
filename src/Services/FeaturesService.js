const FeaturesModel =require("../Models/Featurmodels")
const LegalModel = require("../Models/LegalModel");
const AboutModel = require("../Models/AboutModel");
const TermsModel = require("../Models/TermsModel");
const PolicyModel = require("../Models/Policy");


exports.FeaturesReadService=async ()=>{
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}

exports.LegalReadService=async ()=>{
    try {
        let data = await LegalModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}
exports.AboutReadService=async ()=>{
    try {
        let data = await AboutModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}

exports.TermsReadService=async ()=>{
    try {
        let data = await TermsModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}

exports.PolicyReadService=async ()=>{
    try {
        let data = await PolicyModel.find();
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}
