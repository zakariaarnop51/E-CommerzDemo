const WishModel =require('../Models/WishModels')
const mongoose = require("mongoose");
const ObjectId =mongoose.Types.ObjectId;



exports.CreateWishListService = async (req) => {
    try {
        let user_id= req.headers.user_id;
        let reqBody =req.body;
        reqBody.userID=user_id;
        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true});
        return {status:"success",message:"Product Save WishList"}

    }catch (e) {
        return {status:"Fail",message:"Product Not Save WishList"}

    }
};


exports.ReadWishListService = async (req) => {
    try {
        let user_id=new ObjectId(req.headers.user_id);
        let mechStage={$match:{userID:user_id}};
        let JointStageProduct ={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"Product"}}
        let UnwintStageProduct = {$unwind:"$Product"}

        let JointStageCatagory ={$lookup:{from:"categories",localField:"Product.categoryID",foreignField:"_id",as:"category"}}
        let UnwintStageCatagory = {$unwind:"$category"};

        let JointStageBrand ={$lookup:{from:"brands",localField:"Product.brandID",foreignField:"_id",as:"brand"}}
        let UnwintStageBrand = {$unwind:"$brand"}



        let data =await WishModel.aggregate([
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
        return {status:"Fail",message:"Product : Some Think Went to wrong"}

    }
};


exports.RemoveWishListService = async (req) => {
    try {
        let user_id= req.headers.user_id;
        let reqBody =req.body;
        reqBody.userID=user_id;
        await WishModel.deleteOne(reqBody);
        return {status:"success",message:"Product Remove WishList"}

    }catch (e) {
        return {status:"Fail",message:"SomeThing Went to wrong"}

    }
};
