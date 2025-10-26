
export const successResponse = (res,data =null,message = 'success',statusCode=200)=>{
    return res.status(statusCode).json({
        status:'success',
        message,
        data
    })
}

export const errorResponse = (res, statusCode = 500, message = "Server Error", error = null) => {
  console.error("Error:", message, error?.message || error);

  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error || null,
  });
};

export default {successResponse,errorResponse};