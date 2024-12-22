import expressAsyncHandler from "express-async-handler";
import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export const createUser = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        res.status(400)
        throw new Error('User email already exists')
    }
    const user = await User.create({ name, email, password: password });
    if (user) {
        res.status(201).json({ message: 'created user', data: user.email })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export const login = expressAsyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                email: user.email
            }
        }, process.env.JWT_SECRET,
            { expiresIn: '30m' }
        )
        res.status(200)
        res.setHeader('token', `${accessToken}`)
        res.json({message:'Login Success'})
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const me = expressAsyncHandler(async (req,res)=>{
    
    const {id,email} = req.user;
    if(!id){
        res.status(401)
        throw new Error('Invalid user')
    }

    const user = await User.findById(id);
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    res.status = 200;
    const userResponse ={
        id:user.id,
        name:user.name,
        email:user.email
    }
    res.json({message:'user detail retrived',data:userResponse})
})