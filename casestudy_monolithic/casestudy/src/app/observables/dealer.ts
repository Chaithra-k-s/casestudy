export class dealer{
    constructor(
            // public name:{
            //     type:String,
            //     required:true
            // },
            // public email:{
            //     type:String,
            //     required:true,
            //     unique:true,
            //     match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            // },
            // public password:{
            //     type:String,
            //     required:true
            // },
            public subscribed_crops:crop,
            public bank_details:bank

    ){}
}

 
class crop {
    constructor(
    public crop_name: String,
    public crop_type: String)
    {}
}

class bank{
    constructor(
       public  account_number : {
            type:Number,
            required:true
        },
        public bank_name : {
            type:String, 
            required:true
        },
        public ifsc_code : String
    ){}
    
}