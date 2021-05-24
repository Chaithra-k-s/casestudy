const express =require("express");
const app=express();
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/cropdeal?retryWrites=true&w=majority",
()=>console.log("cropdeal database connected"));

const croproutes=require("./cropserver");
const farmerroutes=require("./farmerserver");
const dealerroutes=require("./dealerserver");
const invoiceroutes=require("./invoiceserver");
const adminroutes=require("./adminserver");

app.use('/crop',croproutes);
app.use('/farmer',farmerroutes);
app.use('/dealer',dealerroutes);
app.use('/invoice',invoiceroutes);
app.use('/admin',adminroutes);
module.exports=app;