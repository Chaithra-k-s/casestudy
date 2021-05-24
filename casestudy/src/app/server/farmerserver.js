//import libraries
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.json());

//connect to database

// let crop=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/crop?retryWrites=true&w=majority",
// ()=>console.log("crop database connected"));
let farmer=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/farmer?retryWrites=true&w=majority",
()=>console.log("farmer database connected"));
// let dealer=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/dealer?retryWrites=true&w=majority",
// ()=>console.log("delaer database connected"));
// let admin=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/admin?retryWrites=true&w=majority",
// ()=>console.log("admin database connected"));
// let invoice=mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/invoice?retryWrites=true&w=majority",
// ()=>console.log("invoice database connected"));

//importing schema

const farmerschema=require("../schemas/farmerschema");
// const dealerschema=require("../schemas/dealerschema");
// const cropschema=require("../schemas/cropschema");
// const invoiceschema=require("../schemas/invoiceschema");
// const admin=require("../schemas/adminschema")

// Api methods

// get all farmer details
app.get("/farmer/",(req,res)=>{
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
app.get('/farmer/profile/:id',(res,req)=>{
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
app.post("/farmer/signup",(req,res)=>{
    farmerschema.create(req.body).then((farmer)=>{
        res.send("farmer added with following details",farmer)
    })
})

app.put("/farmer/:id",(req,res)=>{
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

app.listen("3000",()=>console.log("server is running on 3000"))
