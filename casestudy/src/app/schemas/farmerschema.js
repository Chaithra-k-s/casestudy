const mongoose=require("mongoose");
var schema=mongoose.Schema;

var bank=new schema({
    account_number : {
        type:Number,
        required:true
    },
    bank_name : {
        type:String, 
        required:true
    },
    ifsc_code : String
})

var farmerschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    description:String,
    bank_details:bank
})

module.exports=mongoose.model("farmer",farmerschema);