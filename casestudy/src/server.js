const express=require("express");
const app=express();
const path=require("path");


app.get("/",(req,res)=>{
    res.send("hello checking")
    console.log("hello world")
})
app.post('/',(res,req)=>{
    req.send("post methos")
})

app.listen("3000",()=>console.log("server is running on 3000"))


