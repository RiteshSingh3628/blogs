import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateToken = (payload) =>{
    try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  } 
}

export const refeshToken = (payload) =>{
    jwt.sign(payload,config.JWT_SECRET,{expiresIn:'7d'},(err,token)=>{
        if(err){
            console.error('Error generating refresh token:', err);
            return null;
        }   
        return token;
    });
}