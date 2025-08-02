const ReviewModel =require("../Models/ReviewModels")
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId
exports.ReviewCreateService=async (req)=>{
    try {
        let user_ID = new ObjectID(req.headers.user_id)
        let reqBody = req.body
        let data = await ReviewModel.create({

            productID:reqBody['productID'],
            userID:user_ID,
            des:reqBody['des'],
            rating:reqBody['rating'],
        })
        return { status: "success", data: data };
    } catch (e) {
        return { status: "success", data: e }.toString();
    }
}