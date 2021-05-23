const mongoose=require("mongoose");
var schema=mongoose.Schema;

var adminschema=new schema({
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

module.exports=mangoose.model("admin",adminschema);