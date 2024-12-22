import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name field is mandatory']
    },
    email:{
        type:String,
        required:[true,'email field is mandatory']
    },
    phone:{
        type:String,
        required:[true,'phone field is mandatory']
    },
    user_id:{
        type:String,
        ref:'User'
    }
},{
    timestamps:true
})

export const Contact = mongoose.model('Contact',contactSchema)