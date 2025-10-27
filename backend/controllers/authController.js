import authService from '#services/authService.js'
import { errorResponse,successResponse } from '#helper/responseFormat.js';
export const register = async(req,res)=>{
    try {
        const result = await authService.register(req.body);
        if(result?.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        console.log(result.data)
        return successResponse(res,result.data,'User registered successfully',201);
        
    } catch (error) {
        
    }
}

export default {register};