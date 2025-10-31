import express from 'express';
import {addCategory,deleteCategory,addBulkCategory,getAllCategory,editCategory} from '#controllers/categoryController.js'
const router = express.Router();
router.get('/',getAllCategory);
router.post('/add',addCategory);
router.post('/addbulk',addBulkCategory);
router.delete('/delete',deleteCategory);
router.put('/',editCategory);


export default router;