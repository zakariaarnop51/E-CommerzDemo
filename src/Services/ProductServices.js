const BrandModel = require("../Models/BrandModels");
const ProductSliderModel = require("../Models/ProductSliderModels");
const CategoryModel = require("../Models/Categorymodels");
const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModels");
const ReviewModel=require("../Models/ReviewModels")
const ObjectId = mongoose.Types.ObjectId;

exports.ProductBrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "success", data: e }.toString();
  }
};

exports.ProductCategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "success", data: e }.toString();
  }
};

exports.ProductSliderListService = async () => {
  try {
    let data = await ProductSliderModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "success", data: e }.toString();
  }
};

exports.ProductListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };

    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand"
      }
    };
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        " categoryID": 0,
        " brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      joinWithCategoryStage,
      JoinWithBrandStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "Error", data: e }.toString();
  }
};

exports.ProductListByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand"
      }
    };

    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        " categoryID": 0,
        " brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      joinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "Error", data: e }.toString();
  }
};

exports.ProductListByRemarkService = async (req) => {
  try {
    let remark = req.params.Remark;
    let MatchStage = { $match: { remark: remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand"
      }
    };

    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "categoryID": 0,
        "brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      joinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "Error", data: e }.toString();
  }
};

exports.ProductListBySmilerService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let limitStagce ={$limit:20}
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand"
      }
    };

    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        " categoryID": 0,
        " brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      limitStagce,
      JoinWithBrandStage,
      joinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "Error", data: e }.toString();
  }
};

exports.ProductDetailsService = async (req) => {
  try {
    let Product_ID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { _id: Product_ID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand"
      }
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    let JointWithDetailsStage={$lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details"
      }};

    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    let UnWindDetailStage = { $unwind: "$details" };

    let ProjectionStage = {
      $project: {
        "categoryID": 0,
        "brandID": 0,
        "brand._id": 0,
        "category._id": 0,
        "details._id":0,
        "details.productID":0

      }
    };


    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      joinWithCategoryStage,
      JointWithDetailsStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      UnWindDetailStage,
      ProjectionStage,
    ]);
    return { status: "Success", data: data };
  }catch (e) {
    return { status: "Error", data: e }.toString();
  }
};

exports.ProductListByKeywordService = async (req) => {

  try{
    // Ensure Keyword is provided

    let SearchRegex={"$regex":req.params.Keyword, "$options":"i"}
    let SearchParams=[{price:SearchRegex},{title:SearchRegex},{shortDes:SearchRegex},{remark:SearchRegex}]
    let SearchQuery={$or:SearchParams}

    let MatchStage={$match:SearchQuery}

    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage
    ]);
    return {status:"success",data:data}
  }catch (e) {
    return {status:"fail",data:e}.toString()
  }

};
exports.ProductReviewListService = async (req) => {
  try {
    let Product_ID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: {productID: Product_ID } };
    let JointWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
    let UnWindProfileStage={$unwind:"$profile"}
    let ProjectionStage ={$project:{"cus_name":1,"des":1,"rating":1}}
    let data = await ReviewModel.aggregate([
        MatchStage,
        JointWithProfileStage,
        UnWindProfileStage,
        ProjectionStage

    ]);

    return {status:"success",data:data}


  }catch (e) {
    return {status:"fail",data:e}.toString()
  }
};


exports.ProductListByFilterService = async (req) => {
  try {


    const isValidObjectId = (id) => typeof id === 'string' && id.trim().length === 24;

    console.log(req.body['brandID'])


    let matchbrandID = {};
    if (ObjectId.isValid(req.body['brandID'])) {
      matchbrandID['brandID'] = new ObjectId(req.body['brandID']);
    }
    let matchcategoryID = {};
    if (isValidObjectId(req.body['categoryID'])) {
      matchcategoryID['categoryID'] = new ObjectId(req.body['categoryID']);
    }




    // Match brand/category first
    let MatchStage = { $match: matchbrandID };
    let MatchStage2 = { $match: matchcategoryID };



    // Add numericPrice
    let addFieldStage = { $addFields: { numericPrice: { $toInt: "$price" } } };

    // Optional price filtering
    let PriceMin = parseInt(req.body['priceMin']);
    let PriceMax = parseInt(req.body['priceMax']);
    let PriceCondition = {};


    if (!isNaN(PriceMin)) {
      PriceCondition['numericPrice'] = { $gte: PriceMin };
    }
    if (!isNaN(PriceMax)) {
      PriceCondition['numericPrice'] = {
        ...(PriceCondition['numericPrice'] || {}),
        $lte: PriceMax
      };
    }



    let MatchPriceStage = { $match: PriceCondition };
    let BrandJointStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let CategoryJointStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'brandID':0,'categoryID':0}}
    let data = await ProductModel.aggregate([
        MatchStage,
         MatchStage2,
        addFieldStage,
        MatchPriceStage,
        BrandJointStage,
        CategoryJointStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        ProjectionStage
    ]);
    return { status: "success", data: data };

  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

