import express from 'express';

import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

//router object
const router = express.Router();

//routes
//CREATE CATEGORY || METHOD POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//UPDATE CATEGORY || METHOD PUT
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//GET ALL CATEGORY || METHOD GET
router.get('/get-all-category', getAllCategoryController)

//GET SINGLE CATEGORY || METHOD GET
router.get('/get-single-category/:slug', getSingleCategoryController)

//DELETE CATEGORY || METHOD GET
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router