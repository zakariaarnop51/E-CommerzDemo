const {CreateCardListService, RemoveCardListService, ReadCardListService, UpdateCardListService} = require("../Services/CartListService");

exports.CreateCardList = async (req,res) => {
  let result =await CreateCardListService(req)
    return res.status(200).json(result)
}
exports.ReadCardList = async (req,res) => {
  let result =await ReadCardListService(req)
  return res.status(200).json(result)
}
exports.UpdateCardList = async (req,res) => {
  let result =await UpdateCardListService(req)
  return res.status(200).json(result)
}
exports.RemoveCardList = async (req,res) => {
  let result =await RemoveCardListService(req)
  return res.status(200).json(result)
}