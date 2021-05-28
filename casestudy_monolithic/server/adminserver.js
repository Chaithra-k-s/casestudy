const express=require("express");
const mongoose=require("mongoose");
const bcrypt =require ("bcrypt")
const router=express.Router();

const { db } = require("../schemas/adminschema");
db.collection("admin",{autoIndexId:true})

//importing schema
const adminschema=require("../schemas/adminschema");

//api
router.post('/signup',(req,res,next)=>{
    adminschema.find({email:req.body.email})
    .exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"MAIL EXITS/USER EXITS" 
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    })
                } else{
                    const createdadmin=new adminschema({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password: hash
                    })
                    createdadmin.save()
                    .then(result=>{
                        res.status(201).json({
                            message:"adding admin details",
                            admin:createdadmin 
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

module.exports=router;