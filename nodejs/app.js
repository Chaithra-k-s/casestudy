const express =require("express");
const app=express();

const adminroutes=require("./api/routes/admin");
const croproutes=require("./api/routes/crop");
const farmerroutes=require("./api/routes/farmer");
const dealerroutes=require("./api/routes/dealer");
const invoiceroutes=require("./api/routes/invoice");

app.use('/admin',adminroutes);
app.use('/crop',croproutes);
app.use('/farmer',farmerroutes);
app.use('/dealer',dealerroutes);
app.use('/invoice',invoiceroutes);
module.exports=app;