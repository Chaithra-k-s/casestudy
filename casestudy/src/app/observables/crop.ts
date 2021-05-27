export class crop{
    constructor(
        public crop_name:{
            type:String,
            required:true,
            unique:true
        },
       public crop_type:{
            type:String, 
            required:true
        },
        public crop_quantity:{
            type:Number,
            required:true
        },
        public location:[],
        public crop_img_url: String,
        public uploaded_by:String
    ){}
}