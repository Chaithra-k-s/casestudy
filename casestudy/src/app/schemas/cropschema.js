const mongoose=require("mongoose");
var schema=mongoose.Schema;

var cropschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
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
    location:Array,
    crop_img_url: String,
    uploaded_by:String
})

module.exports=mongoose.model("crop",cropschema);