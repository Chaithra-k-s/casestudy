//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

//connect to database
const { db } = require("../schemas/dealerschema");
db.collection("dealer",{autoIndexId:true})

//importing schema
const dealerschema=require("../schemas/dealerschema");

// Api methods

//getting all data
router.get("/",(req,res)=>{
    dealerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

// fetch particular details with name
router.get('/:id',(req,res)=>{
    dealerschema.findOne({name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

//adding crop
router.post("/",(req,res)=>{
    console.log(req.body)
    const dealer=new dealerschema({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        subscribed_crops:{
            crop_name:req.body.subscribed_crops.crop_name,
            crop_type:req.body.subscribed_crops.crop_type
        },
        bank_details:{
            bank_name:req.body.bank_details.bank_name,
            account_number:req.body.bank_details.account_number,
            ifsc_code:req.body.bank_details.ifsc_code
        }
    });
     dealer.save()
    .then(result=>{
        res.status(201).json({
            message:"updated successfully",
            dealerdetails:result
        })
    })
    .catch(err=>
        {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    }
)

//updating a particular crop
router.put("/:id",(req,res)=>{
    dealerschema.findOneAndUpdate({name:req.params.id},{$set:
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            subscribed_crops:{
                crop_name:req.body.subscribed_crops.crop_name,
                crop_type:req.body.subscribed_crops.crop_type
            },
            bank_details:{
                bank_name:req.body.bank_details.bank_name,
                account_number:req.body.bank_details.account_number,
                ifsc_code:req.body.bank_details.ifsc_code
            }
        }})
        .then(result=>{
            console.log(result);
        })
        .catch(err=>console.log(err));
        res.status(200).json({
            message:"updating dealer data in database",
            edited_details:req.body
        })
})

//deleteing particular crop
router.delete('/:id',(req,res)=>{
    dealerschema.findOneAndDelete({name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error deleting data from database",err)
        }
        else{
            res.send({
                message:"data deleted",
            })
    }
})
})

module.exports=router;