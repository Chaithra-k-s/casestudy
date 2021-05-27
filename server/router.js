const express =require("express");
const app=express();
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt")


//connecting to database
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/cropdeal?retryWrites=true&w=majority",
()=>console.log("cropdeal database connected"));

app.use('/uploads',express.static('uploads'))
//for browsers only
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));

//routing paths
const croproutes=require("./cropserver");
const farmerroutes=require("./farmerserver");
const dealerroutes=require("./dealerserver");
const invoiceroutes=require("./invoiceserver");
const adminroutes=require("./adminserver");

//redirect
app.use('/crop',croproutes);
app.use('/farmer',farmerroutes);
app.use('/dealer',dealerroutes);
app.use('/invoice',invoiceroutes);
app.use('/admin',adminroutes);

app.use((req,res,next)=>{
    const error=new Error("Not found");
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports=app;