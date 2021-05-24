const express=require("express");
const mongoose=require("mongoose");
//const router=express.Router();
const admin=require("../schemas/adminschema");

mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/admin?retryWrites=true&w=majority",
()=>console.log("admin database connected"));

const app=express();

app.post('/signup',(req,res,next)=>{
    const createdadmin=new admin({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    createdadmin.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err))
    res.status(201).json({
        message:"adding admin details",
        createdadmin:createdadmin
    })
    console.log(req.body);
})

app.listen("8000",()=>console.log("server is running on 8000"))