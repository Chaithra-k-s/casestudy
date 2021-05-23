const mongoose=require("mongoose");
var schema=mongoose.Schema;

var invoiceschema=new schema({
    crop_name: String,
    quantity: Number,
    selling_price: Number,
    date: Date,
    payment_method: String,
    total: Number,
    seller: Object,
    payment_method:{
        card_number : Number,
        card_type : String,
        cvv : Number
    }
})

module.exports=mangoose.model("invoice",invoiceschema);