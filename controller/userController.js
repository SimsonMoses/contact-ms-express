import expressAsyncHandler from "express-async-handler";
import { User } from "../model/user.js";


export const createUser = expressAsyncHandler(async(req,res)=>{
    console.log(req.body);    
    const {name,email,password} = req.body;
    const isUserExist = await User.findOne({email});
    if(isUserExist){
        res.status(400)
        throw new Error('User email already exists')
    }
    const user = await User.create({name,email,password:password});
    res.status(200).json({message:'create user'})
})

export const login = async(req,res)=>{
    res.status(200).json({message:loggedIn})
}