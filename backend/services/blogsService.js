import { findBlogBySlug } from "#controllers/blogController.js";
import Blog from "#models/Blog.js";
import sanitizeHtml from "sanitize-html";
import {uploadImage} from '#helper/cloudinaryHelper.js'

export const getAllBlogs = async (query) => {
  try {
    const {
      page = 1,
      sort = 1,
      sort_by = "created_at",
      search,
      limit = 10,
    } = query;
    const filter = {};

    if (search) {
      filter["$or"] = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const [totalDoc, blogs] = await Promise.all([
      Blog.countDocuments(filter),
      Blog.find(filter)
        .sort({ [sort_by]: sort })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);
    return { status: "success", data: { blogs, totalDoc, page, limit } };
  } catch (error) {
    console.error("Error in getAllBlogs service:", error);
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const blog = findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) {
      return { status: "error", message: "Blog not found" };
    }
    return { status: "success", data: blog };
  } catch (error) {}
};

export const getBlogById = async (req) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return { status: "error", message: "Blog not found" };
    }
    return { status: "success", data: blog };
  } catch (error) {
    console.log(error);
  }
};

export const latestBlogs = async () => {
  try {
    const latest = await Blog.find({}, "_id title slug author")
      .sort({ date: -1 })
      .limit(10);
    if (latest.length == 0)
      return { status: "success", data: [], message: "Blogs not found" };
    return { status: "success", data: latest };
  } catch (error) {
    console.error(error);
  }
};

export const topBlogs = async () => {
  try {
    const latest = await Blog.find({}, "_id title slug author")
      .sort({ views: -1 })
      .limit(10);
    if (latest.length == 0)
      return { status: "success", data: [], message: "Blogs not found" };
    return { status: "success", data: latest };
  } catch (error) {
    console.error(error);
  }
};

export const addBlog = async (req) => {
  try {
    const { title, author, content, tags, deck, category } = JSON.parse(req.body.data);

    if(!req.file){
        return { status: "error", message: "Image is not found" };
    }

    if (!title || !author || !content || !deck || !category) {
      return { status: "error", message: "All fields are required" };
    }
    console.log("file",req.file)
    const imageUrl = await uploadImage(req.file.path);
    if(!imageUrl){
      return { status: "error", message: "File not uploaded! try again" };
    }

    const cleanTitle = sanitizeHtml(title);
    const cleanDeck = sanitizeHtml(deck);
    const cleanAuthor = sanitizeHtml(author);

    const newBlog = new Blog({
      title: cleanTitle,
      deck: cleanDeck,
      author: cleanAuthor,
      content,
      tags,
      category,
      image:imageUrl,
    });
    await newBlog.save();

    return {status:"success",message:"Blog added successfully",data:newBlog}
  } catch (error) {
    console.log("adding Blog error",error);
  }
};

export default {
    addBlog,
    getBlogBySlug,
    getAllBlogs,
    getBlogById
}
