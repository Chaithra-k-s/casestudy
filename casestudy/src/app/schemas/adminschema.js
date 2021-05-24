const mongoose=require("mongoose");
var schema=mongoose.Schema;

var adminschema=new schema({
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
    }
})

module.exports=mongoose.model("admin",adminschema);