//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
router.use(bodyParser.json());

//connect to database
const { db } = require("../schemas/farmerschema");
db.collection("farmer",{autoIndexId:true})

//importing schema
const farmerschema=require("../schemas/farmerschema");

// Api methods

// get all farmer details
router.get("/farmer/",(req,res)=>{
    farmerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.json(data);
            console.log(data);
        }
    })
    res.send("getting all elements from crop database collection")
})

// get details of particular farmer with email
router.get('/farmer/profile/:id',(res,req)=>{
    farmerschema.findOne({email:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.json(data);
            console.log(data);
        }
    })
    req.send("getting specific data from farmer database collection")
})

// adding farmer only for admin
router.post("/farmer/signup",(req,res)=>{
    farmerschema.create(req.body).then((farmer)=>{
        res.send("farmer added with following details",farmer)
    })
})

router.put("/farmer/:id",(req,res)=>{
    cropschema.findOneAndUpdate({email:req.params.id},{$set:
        {
           //bank_details.account_number=acc_number,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            discription:req.body.description,
            acc_number:req.body.bank_details.account_number,
            uploaded_by:req.body.uploaded_by
        }}).exec((err,data)=>{
            if(err){
                res.send("error fetching data from database",err)
            }
            else{
                res.send("data updated");
                console.log("data updated with:",data);
            }
        })
        res.send("updating data in database")
})

router.delete('/crop/:id',(res,req)=>{
    cropschema.findOneAndDelete({crop_name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error deleting data from database",err)
        }
        else{
            res.send("data deleted");
            console.log("data deleted",data);
        }
    })
    req.send("Deleting specific data from crop database collection")
})

module.exports=router;