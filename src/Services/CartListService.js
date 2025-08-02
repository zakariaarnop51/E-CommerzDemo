const {CartModel} = require("../Models/CardModels");
const mongoose = require("mongoose");
const ObjectId=mongoose.Types.ObjectId;


exports.CreateCardListService=async (req,res)=>{
    try {
        let user_id =req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id
        await CartModel.create(reqBody);
        return {status:"success",message:"Card Add Success"}
    }catch (e) {
        return {status:"Fail",message:"Login Fast Then add to card"}
    }
}
exports.ReadCardListService=async (req)=>{
    try {
        let user_id=new ObjectId(req.headers.user_id);
        let mechStage={$match:{userID:user_id}};
        let JointStageProduct ={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"Product"}}
        let UnwintStageProduct = {$unwind:"$Product"}

        let JointStageCatagory ={$lookup:{from:"categories",localField:"Product.categoryID",foreignField:"_id",as:"category"}}
        let UnwintStageCatagory = {$unwind:"$category"};

        let JointStageBrand ={$lookup:{from:"brands",localField:"Product.brandID",foreignField:"_id",as:"brand"}}
        let UnwintStageBrand = {$unwind:"$brand"}

        let data =await CartModel.aggregate([
            mechStage,
            JointStageProduct,
            UnwintStageProduct,
            JointStageCatagory,
            UnwintStageCatagory, 
            JointStageBrand,
            UnwintStageBrand
        ]);

        return {status:"success",data:data}
    }catch (e) {
        return {status:"Fail",message:"Login Fast Then add to card"}
    }
};

exports.UpdateCardListService=async (req,res)=>{
    try {
        let user_id =req.headers.user_id;
        let cardID =req.params.cardId;
        let reqBody=req.body;

        await CartModel.updateOne({_id:cardID,userID:user_id},{$set:reqBody});
        return {status:"success",message:"Card Update Success"}
    }catch (e) {
        return {status:"Fail",message:"Login Fast Then add to card"}
    }
}

exports.RemoveCardListService=async (req,res)=>{
    try {
        let user_id =req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id
        await CartModel.deleteOne(reqBody);
        return {status:"success",message:"Card Remove Success"}
    }catch (e) {
        return {status:"Fail",message:"Login Fast Then add to card"}
    }
}