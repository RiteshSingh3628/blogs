import authService from '#services/authService.js'
import { errorResponse,successResponse } from '#helper/responseFormat.js';
export const register = async(req,res)=>{
    try {
        const result = await authService.register(req.body);
        if(result?.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        return successResponse(res,result.data,'User registered successfully',201);
        
    } catch (error) {
        console.log("register controller error:",error);
    }
}

export const login = async(req,res)=>{
    try {
        const result = await authService.login(req.body);
        if(result?.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        return successResponse(res,result.data,'User login successful',200);

    } catch (error) {
        console.log("login controller error:",error);
        
    }
}
export default {register};