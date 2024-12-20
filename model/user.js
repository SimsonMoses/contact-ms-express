import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'User Name must not be empty']
    },
    email:{
        type:String,
        required: [true,'Email must not be empty'],
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try{
    this.password = await bcrypt.hash(this.password,10)
    next();
    }catch(error){
        console.log(error);
    }
})

export const User = mongoose.model('user',userSchema)