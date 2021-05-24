const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const invoice=require("../schemas/invoiceschema");

const { db } = require("../schemas/invoiceschema");
db.collection("invoice",{autoIndexId:true})

router.post('/signup',(req,res,next)=>{
    const createdadmin=new admin({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    createdadmin.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err))
    res.status(201).json({
        message:"adding admin details",
        createdadmin:createdadmin
    })
    console.log(req.body);
})

module.exports=router;