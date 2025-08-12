const express = require("express");
const {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByCategory,
  ProductListBySmiler,
  ProductListByKeyword,
  ProductListByRemark,
  ProductDetails,
  ProductReviewList, ProductListFilter,
} = require("../Controller/ProductController");
const AuthVerification=require("../Middleware/AuthVerification")
const {UserLogin, UserVerifyLogin, UserLogOut, CreatProfile, UpdateProfile, ReadProfile} = require("../Controller/UserController");
const {CreateWishList, RemoveWishList, ReadWishList} = require("../Controller/WishListController");
const {CreateCardList, RemoveCardList, ReadCardList, UpdateCardList} = require("../Controller/CartListController");
const {CreateInvoice, InvoiceList, InvoiceProductList, PaymentFail, PaymentIPN, PaymentSuccess, PaymentCancel} = require("../Controller/InvoiceController.");
const {FeaturesCreate, FeaturesRead, LegalRead, PolicyRead, AboutRead, TremsRead} = require("../Controller/FeaturesController");
const {ReviewCreate} = require("../Controller/ReviewController");
const router = express.Router();

//Product

router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductListByCategory);
router.get("/ProductListBySmiler/:CategoryID", ProductListBySmiler);
router.get("/ProductListByRemark/:Remark", ProductListByRemark);
router.get("/ProductDetails/:ProductID", ProductDetails);
router.get("/ProductListByKeyword/:Keyword", ProductListByKeyword);
router.get("/ProductReviewList/:ProductID", ProductReviewList);
router.post("/ProductFilter",ProductListFilter)

//User api list
router.get("/UserOtp/:email", UserLogin);
router.get("/UserVerifyLogin/:Email/:Otp", UserVerifyLogin);
router.get("/UserLogOut",AuthVerification,UserLogOut);
router.post("/CreatProfile",AuthVerification,CreatProfile);
router.post("/UpdateProfile",AuthVerification,UpdateProfile);
router.get("/ReadProfile",AuthVerification,ReadProfile);


// WistList Api
router.post("/CreateWishList",AuthVerification,CreateWishList );
router.get("/ReadWishList",AuthVerification,ReadWishList );
router.post("/RemoveWishList",AuthVerification,RemoveWishList );

//CartList
router.post("/CreateCardList",AuthVerification,CreateCardList);
router.get("/ReadCardList",AuthVerification,ReadCardList);
router.post("/UpdateCardList/:cardId",AuthVerification,UpdateCardList);
router.post("/RemoveCardList",AuthVerification,RemoveCardList);


//! Invoice Api......

router.get("/CreateInvoice",AuthVerification,CreateInvoice)

router.get("/InvoiceList",AuthVerification,InvoiceList)
router.get("/InvoiceProductList/:invoiceID",AuthVerification,InvoiceProductList)

router.post("/PaymentSuccess/:trxID",PaymentSuccess)
router.post("/PaymentCancel/:trxID",PaymentCancel)
router.post("/PaymentFail/:trxID",PaymentFail)
router.post("/PaymentIPN/:trxID",PaymentIPN)

//!  Features Api.......
router.get("/FeaturesRead", FeaturesRead)
router.get("/LegalDetails/:type", LegalRead)
router.get("/PolicyDetails/:type", PolicyRead)
router.get("/LegalDetails/:type", AboutRead)
router.get("Trems/Details/:type", TremsRead)



// Review API
router.post("/ReviewCreate",AuthVerification,ReviewCreate)


module.exports = router;
