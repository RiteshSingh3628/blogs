import CategoryServices from "#services/categoryServices.js";
import { successResponse, errorResponse } from "#helper/responseFormat.js";
export const addCategory = async (req, res) => {
  try {
    const result = await CategoryServices.addCategory(req.body);
    if (result?.status === false) {
      return errorResponse(res, 400, result.message);
    }
    return successResponse(res, null, result.message, 200);
  } catch (error) {
    console.log("category controller error: ", error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const addBulkCategory = async (req, res) => {
  try {
    const result = await CategoryServices.addCategoriesBulk(req.body);
    if (result?.status === false) {
      return errorResponse(res, 400, result.message);
    }
    return successResponse(res, null, result.message, 200);
  } catch (error) {
    console.log("category controller error: ", error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const result = await CategoryServices.deleteCategory(req.body);
    if (result?.status === false) {
      return errorResponse(res, 400, result.message);
    }
    return successResponse(res, null, result.message, 200);
  } catch (error) {
    console.log("category controller error: ", error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const result = await CategoryServices.getAllCategory();
    if (result?.status === false) {
      return errorResponse(res, 400, result.message);
    }

    return successResponse(res, result.data, result.message, 200);
  } catch (error) {
    console.log("category controller error: ", error);
    return errorResponse(res, 500, "Internal server error");
  }
};

export const editCategory = async (req, res) => {
  try {
    const result = await CategoryServices.editCategory(req.body);
    if (result?.status === false) {
      return errorResponse(res, 400, result.message);
    }
    return successResponse(res, result.data, result.message, 200);
  } catch (error) {
    console.log("category controller error: ", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
