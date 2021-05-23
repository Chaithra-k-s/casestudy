const express=require("express");
const app=express();
const mangoose=require("mongoose")

const bodyParser=require("body-parser");

app.get("/",(req,res)=>{
    res.send("hello checking")
    console.log("hello world")
})
app.post('/',(res,req)=>{
    req.send("post methos")
})

app.listen("3000",()=>console.log("server is running on 3000"))


