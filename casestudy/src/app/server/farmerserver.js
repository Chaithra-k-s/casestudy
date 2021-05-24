//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

//connect to database
const { db } = require("../schemas/farmerschema");
db.collection("farmer",{autoIndexId:true})

//importing schema
const farmerschema=require("../schemas/farmerschema");

// Api methods

//getting all data
router.get("/",(req,res)=>{
    farmerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

// fetch particular farmer details with name
router.get('/:id',(req,res)=>{
    farmerschema.findOne({name:req.params.id}).exec((err,data)=>{
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
    const farmer=new farmerschema({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        description:req.body.description,
        bank_details:{
            bank_name:req.body.bank_details.bank_name,
            account_number:req.body.bank_details.account_number,
            ifsc_code:req.body.bank_details.ifsc_code
        }
    });
     farmer.save()
    .then(result=>{
        res.status(201).json({
            message:"updated successfully",
            farmerdetails:result
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
    farmerschema.findOneAndUpdate({name:req.params.id},{$set:
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            description:req.body.description,
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
            message:"updating farmer data in database",
            edited_details:req.body
        })
})

//deleteing particular crop
router.delete('/:id',(req,res)=>{
    farmerschema.findOneAndDelete({name:req.params.id}).exec((err,data)=>{
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