const { CartModel } = require("../Models/CardModels");
const mongoose = require("mongoose");
const ProfileModel = require("../Models/ProfileModels");
const InvoiceModel = require("../Models/InvoiceModels");
const InvoiceProductModel = require("../Models/InvoiceProductModels");
const PaymentSettingModel = require("../Models/PamentSettingModels");
const ObjectId = mongoose.Types.ObjectId;
const FormData=require("form-data")
const axios = require("axios");

exports.CreateInvoiceService = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.user_id);
    let email = req.headers.email;

    //!=========================Calculete, vat Paybole =======================
    let mechStage = { $match: { userID: user_id } };
    let JointStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "Product",
      },
    };
    let UnwintStageProduct = { $unwind: "$Product" };
    let CardModel = await CartModel.aggregate([
      mechStage,
      JointStageProduct,
      UnwintStageProduct,
    ]);
    let totalAmount = 0;
    CardModel.forEach((e) => {
      let price;
      if (e["Product"]["discount"]) {
        price = parseFloat(e["Product"]["discountPrice"]);
      } else {
        price = parseFloat(e["Product"]["price"]);
      }
      totalAmount += price * parseFloat(e["qty"]);
    });
    let vat = totalAmount * 0.05; //5%vat
    let totalAmountPayable = totalAmount + vat;

    //!===============Customer Shiping Detail Customer Adress===

    let Profile = await ProfileModel.aggregate([mechStage]);
    let cus_Details = `Name:${Profile[0]["cus_name"]},Email:${email},Phone:${
      Profile[[0]["cus_phone"]]
    },Address:${Profile[0]["cus_add"]},PostCod:${
      Profile[0]["cus_postcode"]
    },City:${Profile[0]["cus_city"]},State:${Profile[0]["cus_state"]},Country:${
      Profile[0]["cus_country"]
    }`;

    let Ship_Details = `Name:${Profile[0]["ship_name"]},Email:${email},Phone:${
      Profile[[0]["ship_phone"]]
    },Address:${Profile[0]["ship_add"]},PostCod:${
      Profile[0]["ship_postcode"]
    },City:${Profile[0]["ship_city"]},State:${
      Profile[0]["ship_state"]
    },Country:${Profile[0]["ship_country"]}`;


    //!===============================Create Transtion ==========================================
    let tran_id = Math.floor(10000000 + Math.random() * 90000000);
    let Val_id = 0;
    let Delivery_Status = "Pending";
    let Payment_Status = "Pending";

    //!================================Create invoice ======================================
    let Invoice = await InvoiceModel.create({
      userID: user_id,
      payable: totalAmountPayable,
      cus_details: cus_Details,
      ship_details: Ship_Details,

      tran_id: tran_id,
      val_id: Val_id,
      payment_status: Payment_Status,

      delivery_status: Delivery_Status,

      total: totalAmount,
      vat: vat,
    });

    //!==========================================Create Product Invoice ==============================

    let Invoice_id = Invoice["_id"];
    CardModel.forEach(async (e) => {
      await InvoiceProductModel.create({
        userID: user_id,
        productID: e['productID'],
        invoiceID: Invoice_id,
        qty: e["qty"],
        price:e["Product"]["discount"]?e["Product"]["discount"]:e["Product"]["price"] ,
        color: e["color"],
        size: e["size"],
      });
    });

    //!======================= Remove CardList=========================
    await CartModel.deleteMany({ userID: user_id });

    //!================================Step 07: Prepare SSL payment ====================
    let  paymentSetting =await PaymentSettingModel.find()
    // SSL payment gateway integration here...
    let form = new FormData();
    form.append('store_id',paymentSetting[0]['store_id'])
    form.append('store_passwd',paymentSetting[0]['store_passwd'])
    form.append('total_amount',totalAmountPayable.toString())
    form.append('currency',paymentSetting[0]['currency'])
    form.append('tran_id',tran_id)
    form.append('success_url',`${paymentSetting[0]['success_url']}/${tran_id}`)
    form.append('fail_url',`${paymentSetting[0]['fail_url']}/${tran_id}`)
    form.append('cancel_url',`${paymentSetting[0]['cancel_url']}/${tran_id}`)
    form.append('ipn_url',`${paymentSetting[0]['ipn_url']}/${tran_id}`)
    //!Customer Information
    form.append('cus_name',Profile[0]['cus_name'])
    form.append('cus_email',email)
    form.append('cus_add1',Profile[0]['cus_add'])
    form.append('cus_add2',Profile[0]['cus_add'])
    form.append('cus_city',Profile[0]['cus_city'])
    form.append('cus_state',Profile[0]['cus_state'])
    form.append('cus_postcode',Profile[0]['cus_postcode'])
    form.append('cus_country',Profile[0]['cus_country'])
    form.append('cus_phone',Profile[0]['cus_phone'])
    form.append('cus_fax',Profile[0]['cus_phone'])

    form.append('shipping_method',"YES")

    form.append('ship_name',Profile[0]['ship_name'])
    form.append('ship_add1',Profile[0]['ship_add'])
    form.append('ship_add2',Profile[0]['ship_add'])
    form.append('ship_area',Profile[0]['ship_phone'])
    form.append('ship_city',Profile[0]['ship_city'])
    form.append('ship_sub_city',Profile[0]['ship_city'])
    form.append('ship_state',Profile[0]['ship_state'])
    form.append('ship_postcode',Profile[0]['ship_postcode'])
    form.append('ship_country',Profile[0]['ship_country'])



    form.append('product_name',"MERN Shop Product")
    form.append('product_category',"MERN Shop Product Category")
    form.append('product_profile',"MERN Shop Product Profile")
    form.append('product_amount',"According Invoice")
    form.append('vat',"MERN Shop Product Profile")
    form.append('discount_amount',"MERN Shop Product Profile")
    form.append('product_profile',"MERN Shop Product Profile")


    let SSLRes=await axios.post(paymentSetting[0]['init_url'],form )
    console.log(`log:${SSLRes.data}`)


    return { status: "Success", data:SSLRes.data };
  } catch (e) {
    return { status: "fail",message:"code Problem",data: e };
  }
};

exports.PaymentSuccessService = async (req) => {
    try {
        let texId = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:texId},{payment_status:"success"})
      return {status:'Success',message:"Your Payment Success"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
};


exports.PaymentFailService = async (req) => {
    try {
        let texId = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:texId},{payment_status:"Fail"})
      return {status:'Fail',message:"Your Payment Fail"}

    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
};

exports.PaymentCancelServiceService = async (req) => {
    try {
        let texId = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:texId},{payment_status:"Cancal"})
        return { status: "Cancel",message:"Your Payment Cancel"};

    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
};

exports.PaymentIPNService = async (req) => {
  try {
    let texId = req.params.trxID;
    let status=req.body['status'];

    await InvoiceModel.updateOne({tran_id:texId},{payment_status:status})

  }catch (e) {
    return {status:"fail", message:"Something Went Wrong"}
  }
};


exports.InvoiceListService = async (req) => {
try {
  let user_ID =req.headers.user_id
  let data = await InvoiceModel.find({userID:user_ID});
  return { status: "Success",data:data};

} catch (e) {
  return {status:"fail", data:e.toString()}

}
};
exports.InvoiceProductListService = async (req) => {
  try {
    let user_Id = new ObjectId(req.headers.user_id)
    let invoice_id = new ObjectId(req.params.invoiceID)
    let MatchStage = {$match: {userID:user_Id,invoiceID:invoice_id}}
    let JointProductStage = {$lookup: {from: "products",localField: "productID",foreignField: "_id",as: "Product"}};
    let ProductUnwind = {$unwind: "$Product"}

    let data =await InvoiceProductModel.aggregate([
        MatchStage,
        JointProductStage,
         ProductUnwind
    ])

    return {status:"Success",Data:data}

  }catch (e) {
    return {status:"fail", data:e.toString()}
  }
};
