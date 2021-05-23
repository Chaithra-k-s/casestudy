//import libraries
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.json());

//connect to database
let crop=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
()=>console.log("crop database connected"));
// let farmer=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
// ()=>console.log("farmer database connected"));
// let dealer=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
// ()=>console.log("delaer database connected"));
// let admin=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
// ()=>console.log("admin database connected"));
// let invoice=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
// ()=>console.log("invoice database connected"));

//importing schema
// const farmerschema=require("../../schemas/farmerschema");
// const dealerschema=require("../../schemas/dealerschema");
const cropschema=require("../../schemas/cropschema");
// const invoiceschema=require("../../schemas/invoiceschema");
// const admin=require("../../schemas/adminschema")

// Api methods

//getting all data
app.get("/crop/",(req,res)=>{
    cropschema.find({}).exec((err,data)=>{
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

// fetch particular crop details with name
app.get('/crop/:id',(res,req)=>{
    cropschema.findOne({crop_name:req.params.id}).exec((err,data)=>{
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

//adding crop
app.post("/crop/",(req,res)=>{
    cropschema.create(req.body).then((err,crop)=>{
        if(err){
            res.send("error adding data to database",err)
        }else{
            res.send("crop added with following details",crop)
        }
        res.send("adding crop details ....",crop)
    })
})

//updating a particular crop
app.put("/crop/:id",(req,res)=>{
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
app.delete('/crop/:id',(res,req)=>{
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

app.listen("8000",()=>console.log("server is running on 3000"))
