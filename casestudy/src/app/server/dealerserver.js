//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
router.use(bodyParser.json());

//importing schema
const dealerschema=require("../schemas/dealerschema");
const { db } = require("../schemas/dealerschema");
db.collection("dealer",{autoIndexId:true})
// Api methods

//dealer
router.get("/dealer/",(req,res)=>{
    dealerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.json(data);
            console.log(data);
        }
    })
    res.send("getting all elements from dealer database collection")
})

router.get('/dealer/:id',(res,req)=>{
    dealerschema.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.json(data);
            console.log(data);
        }
    })
    req.send("getting specific data from crop database collection")
})

router.post("/crop/",(req,res)=>{
    dealerschema.create(req.body).then((crop)=>{
        res.send("crop added with following details",crop)
    })
})

router.put("/crop/:id",(req,res)=>{
    dealerschema.findOneAndUpdate({crop_name:req.params.id},{$set:
        {
            crop_name:req.body.crop_name,
            crop_type:req.body.crop_type,
            crop_quantity:req.body.crop_quantity,
            location:req.body.location,
            crop_img_url:req.body.crop_img_url,
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
    dealerschema.findOneAndDelete({crop_name:req.params.id}).exec((err,data)=>{
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
