// function to find a blog using slug
import blogsService from '#services/blogsService.js'
import {errorResponse,successResponse} from '#helper/responseFormat.js'

export const findBlogBySlug = async (req,res)=>{
    try{
        const result = await blogsService.getBlogBySlug (req.params.slug);
        if(result.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        return successResponse(res,result.data,result.message,200);

    }catch(error){

    }
}

export const addBlog = async(req,res)=>{
    try {

        const result  = await blogsService.addBlog(req);
        if(result.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        return successResponse(res,result.data,result.message,200);

        
    } catch (error) {
        
        console.log("Blog controller error: ",error);
    }
}

export const findAllBlogs = async (req,res)=>{
    try {
        const result = await blogsService.getAllBlogs(req.query)
        if(result.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        
        return successResponse(res,result.data,result.message,200);
    } catch (error) {
        
    }
}

export const findMostViewedBlogs = async (req,res)=>{
    try {
        const result = blogsService.getMostViewedBlogs(req.query)
        if(result.status === 'error'){
            return errorResponse(res,400,result.message);
        }
        return successResponse(res,result.data,result.message,200);
    } catch (error) {
        
    }
}