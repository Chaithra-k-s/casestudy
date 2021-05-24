//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
router.use(bodyParser.json());

//connect to database
const { db } = require("../schemas/cropschema");
db.collection("crop",{autoIndexId:true})

//importing schema
const cropschema=require("../schemas/cropschema");

// Api methods

//getting all data
router.get("/",(req,res)=>{
    cropschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

// fetch particular crop details with name
router.get('/:id',(res,req)=>{
    cropschema.findOne({_id:req.params.id}).exec((err,data)=>{
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
   // _id:new mongoose.Types.ObjectId(),
     cropschema.create(req.body).then((crop,err)=>{
        if(err){
            res.send("error adding data to database",err)
        }else{
            console.log(crop);
            res.send(crop);
        }
    })  
    // console.log("post method")
    // res.send(req.body)
})

//updating a particular crop
router.put("/:id",(req,res)=>{
    cropschema.findOneAndUpdate({crop_name:req.params.id},{$set:
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

//deleteing particular crop
router.delete('/:id',(res,req)=>{
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