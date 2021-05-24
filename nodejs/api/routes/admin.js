const express=require("express");
const router=express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"adding data"
    })
})

router.get("/:id",(req,res,next)=>{
    res.status(200).json({
        message:"adding data"
    })
})

module.exports=router;