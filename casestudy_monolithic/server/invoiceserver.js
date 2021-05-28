const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const invoice=require("../schemas/invoiceschema");

const { db } = require("../schemas/invoiceschema");
db.collection("invoice",{autoIndexId:true})

router.post('/generate',(req,res,next)=>{
    const createinvoice=new invoice({
        _id:new mongoose.Types.ObjectId(),
        crop_name: req.body.crop_name,
        quantity: req.body.quantity,
        selling_price: req.body.selling_price,
        paymentMethod: req.body.paymentMethod,
        total:(req.body.quantity*req.body.selling_price),
        seller: req.body.seller,
        payment_method:{
            card_number : req.body.payment_method.card_number,
            card_type : req.body.payment_method.card_type,
            cvv : req.body.payment_method.cvv
        }
    })
    createinvoice.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err))
    res.status(201).json({
        message:"adding invoice details",
        createdadmin:createinvoice
    })
    console.log(req.body);
})

module.exports=router;