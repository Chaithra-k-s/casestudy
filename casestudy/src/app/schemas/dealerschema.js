const mongoose=require("mongoose");
var schema=mongoose.Schema;

var dealerschema=new schema({
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
    subscribed_crops:{
        crop_name: string,
        crop_type: string
    },
    bank_details:{
        account_number : {
            type:Number,
            required:true
        },
        bank_name : {
            type:String, 
            required:true
        },
        ifsc_code : String
    }
})

module.exports=mangoose.model("dealer",dealerschema);