//import libraries
const express=require("express");
const router=express.Router();
const multer=require("multer");

const mongoose=require("mongoose");

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const filefilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else {
        cb(new Error("Doesnot support type"),false)
    }
}
const upload=multer({storage:Storage,limits:{
    fileSize:1024*1024*5
}})
//const upload=multer({dest:"./uploads/"});

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
router.post("/",upload.single("crop_img_url"),(req,res)=>{
    cropschema.find({crop_name:req.body.crop_name})
    .exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"CROP EXITS" 
            })
        }else{
            const crop=new cropschema({
                _id:new mongoose.Types.ObjectId(),
                crop_name:req.body.crop_name,
                crop_type:req.body.crop_type,
                crop_quantity:req.body.crop_quantity,
                location:req.body.location,
                crop_img_url:req.file.destination+req.file.originalname,
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
        } 
    })  
})
    

//updating a particular crop
router.put("/:id",(req,res)=>{
    // const updateops={};
    // for (const ops of req.body){
    //     updateops[ops.crop_name]=ops.value;
    // }
    // should send data as array to update
    cropschema.findOneAndUpdate({crop_name:req.params.id},{$set:
        //updateops
    // normal json format to update but shd remove loop 
        {
            crop_name:req.body.crop_name,
            crop_type:req.body.crop_type,
            crop_quantity:req.body.crop_quantity,
            location:req.body.location,
            crop_img_url:req.body.crop_img_url,
            uploaded_by:req.body.uploaded_by
        }
    }).exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
            message:"updating data in database",
            editedcrop:req.body
        })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        }
            );
        
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