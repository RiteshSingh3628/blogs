import User from '#models/User.js';
import {generateToken} from '#utils/jwtToken.js'
export const register = async (body)=>{
    try {
        const {username,email,password} = body;
        if(!username || !email || !password){
            return {status:'error',message:'All fields required'}
        }

        const user = await User.findOne({email});
        if(user){
            return {status:'error',message:'User already exists with this email'};
        }
        const newUser = new User({username,email,password});
        await newUser.save();

        const token = await generateToken({id:newUser._id});
        console.log("Generated Token:", token);
        return {status:'sucesss',data:{user:newUser,token:token}};

    } catch (error) {
        console.error('Error in register service:', error);
    }
}

export default {register};