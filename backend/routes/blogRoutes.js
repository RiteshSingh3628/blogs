import express from 'express'
const router = express.Router();
import {addBlog,findAllBlogs,findBlogBySlug,findMostViewedBlogs} from '#controllers/blogController.js'
import upload from '#middlewares/uploadMiddleware.js';

router.post('/add',upload.single('image'),addBlog);
router.get('/',findAllBlogs);
router.get('/:slug',findBlogBySlug);
router.get('/most-viewed',findMostViewedBlogs);

export default router;