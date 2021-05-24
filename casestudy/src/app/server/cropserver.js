//import libraries
const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

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
router.get('/:id',(req,res)=>{
    cropschema.findOne({crop_name:req.params.id}).exec((err,data)=>{
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
    const crop=new cropschema({
        _id:new mongoose.Types.ObjectId(),
        crop_name:req.body.crop_name,
        crop_type:req.body.crop_type,
        crop_quantity:req.body.crop_quantity,
        location:req.body.location,
        crop_img_url:req.body.crop_type,
        uploaded_by:req.body.uploaded_by
    });
    crop.save()
    .then(result=>{
        res.status(201).json({
            message:"updated successfully",
            cropdetails:result
        })
    })
    .catch(err=>
        {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    //     res.status(200).json({
    //     message:"updating data in database",
    //     createdcrop:crop
    // })
    }
)

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
        }})
        .then(result=>{
            console.log(result);
        })
        .catch(err=>console.log(err));
        res.status(200).json({
            message:"updating data in database",
            editedcrop:req.body
        })
})

//deleteing particular crop
router.delete('/:id',(req,res)=>{
    cropschema.findOneAndDelete({crop_name:req.params.id}).exec((err,data)=>{
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