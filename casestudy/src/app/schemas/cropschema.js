const mongoose=require("mongoose");
var schema=mongoose.Schema;

var cropschema=new schema({
    crop_name:{
        type:String,
        required:true,
        unique:true
    },
    crop_type:{
        type:String, 
        required:true
    },
    crop_quantity:{
        type:Number,
        required:true
    },
    location:{
        type:string
    },
    crop_img_url: String,
    uploaded_by:ObjectID
})

module.exports=mangoose.model("crop",cropschema);