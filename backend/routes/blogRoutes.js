import express from 'express'
const router = express.Router();
import {addBlog} from '#controllers/blogController.js'
import upload from '#middlewares/uploadMiddleware.js';

router.post('/add',upload.single('image'),addBlog);

export default router;