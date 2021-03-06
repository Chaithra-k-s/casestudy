//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bcrypt =require ("bcrypt")

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
    farmerschema.find({email:req.body.email})
    .exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"MAIL EXITS" 
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    })
                } else{
                    const farmer=new farmerschema({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
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
                    .catch(err=>{
                        console.log(err),
                        res.status(402).json({
                            message:"INVALID EMAIL ID",
                            ERROR:err._message
                        })
                    })
                    }
                })
            }
        })
    })  

//updating a particular crop
router.put("/:id",(req,res)=>{
    farmerschema.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"MAIL EXITS" 
            })
        }else{
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
                    .then(result=>{
                        res.status(201).json({
                            message:"updated successfully",
                            farmerdetails:result
                        })
                    })
                    .catch(err=>{
                        console.log(err),
                        res.status(402).json({
                            message:"INVALID EMAIL ID",
                            ERROR:err._message
                        })
                    })
                }
            })
        }
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