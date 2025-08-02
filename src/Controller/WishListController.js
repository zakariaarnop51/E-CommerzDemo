const {CreateWishListService, ReadWishListService, RemoveWishListService} = require("../Services/WishListService");


exports.CreateWishList = async (req, res) => {
    let result = await CreateWishListService(req);
    return res.status(200).json(result);
};

exports.ReadWishList = async (req, res) => {
    let result = await ReadWishListService(req);
    return res.status(200).json(result);
};

exports.RemoveWishList = async (req, res) => {
    let result = await RemoveWishListService(req);
    return res.status(200).json(result);
};
