const mongoose=require("mongoose");
var schema=mongoose.Schema;

var crop=new schema({
    crop_name: string,
    crop_type: string
})

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

var dealerschema=new schema({
    _id:mongoose.Types.ObjectId,
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
    subscribed_crops:crop,
    bank_details:bank
})

module.exports=mangoose.model("dealer",dealerschema);