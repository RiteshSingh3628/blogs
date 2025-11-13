import Category from "#models/Category.js";

export const addCategory = async(body) => {
  try {
    
    const {name} = body;
    if (!name  || name=="") {
      return { status: false, message: "name is missing" };
    }
    name = name.trim().tolowerCase();
    // checking if category already exist
    const isPresent = await Category.findOne({ name });
    if (isPresent) {
      return { status: false, message: "category already exist" };
    }

    const newCat = new Category({
      name,
    });
    await newCat.save();
    return { status: true, message: "category added" };
  } catch (error) {
    console.log("error adding category data:", error);
    return { status: false, message: "Error adding category" };
  }
};

export const addCategoriesBulk = async (body) => {
  try {
    console.log(body);

    const { names } = body;
    if (!Array.isArray(names) || names.length === 0) {
      return { status: false, message: "names array is missing or empty" };
    }

    const validNames = names.filter(name => typeof name === 'string' && name.trim() !== '');
    if (validNames.length === 0) {
      return { status: false, message: "no valid category names provided" };
    }

    // Check which categories already exist
    const existing = await Category.find({ name: { $in: validNames } });
    const existingNames = existing.map(cat => cat.name);

    // Filter out already existing names
    const newNames = validNames.filter(name => !existingNames.includes(name));

    if (newNames.length === 0) {
      return { status: false, message: "all categories already exist" };
    }

    const newCategories = newNames.map(name => ({ name }));
    await Category.insertMany(newCategories);

    return {
      status: true,
      message: `${newCategories.length} categories added`,
      added: newNames,
      skipped: existingNames
    };
  } catch (error) {
    console.log("error adding categories in bulk:", error);
    return { status: false, message: "Error adding categories in bulk" };
  }
};

export const deleteCategory =async (body) => {
  try {
    const {catId} = body;
    if (!catId) {
      return { status: false, message: "id is missing" };
    }

    // checking if category already exist
    const isDeleted = await Category.findByIdAndDelete(catId);
    if (!isDeleted) {
      return { status: false, message: "unable to delete category" };
    }
    return { status: true, message: "category deleted" };
  } catch (error) {
    console.log("error deleting category data:", error);
    return { status: false, message: "Error deleting category" };
  }
};

export const getAllCategory =async () => {
  try {
    const cat = await Category.find().lean();
    return { status: true, message: "got category successfully", data: cat };
  } catch (error) {
    console.log("error getting category data:", error);
    return { status: false, message: "Error getting categories", data: [] };
  }
};

export const editCategory = async (body)=>{
  try {
    const {id,name} = body;
    if(!id){
      return { status: false, message: "id is missing" };
    }
    const updatedCat = await Category.findByIdAndUpdate(id,{name},{new:true});
    if (!updatedCat) {
      return { status: false, message: "unable to update category" };
    }
    return { status: true,data:updatedCat, message: "category updated" };
  } catch (error) {
    console.log("error getting category data:", error);
    return { status: false, message: "Error getting categories", data: [] };
  }
}

export default {
    getAllCategory,
    addCategory,
    deleteCategory,
    addCategoriesBulk,
    editCategory
}
