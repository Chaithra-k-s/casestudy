const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const admin=require("../schemas/adminschema");
const bodyParser=require("body-parser");
router.use(bodyParser.json());

const { db } = require("../schemas/adminschema");
db.collection("admin",{autoIndexId:true})

//importing schema
const cropschema=require("../schemas/cropschema");

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