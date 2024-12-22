import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name must not be empty']
    },
    email: {
        type: String,
        required: [true, 'Email must not be empty'],
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    console.log('previous save executed');
    
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next();
    } catch (error) {
        console.log(error);
    }
})

/**
 * User Schema fields
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns {Boolean}
*/
export const User = mongoose.model('user', userSchema)