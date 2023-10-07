import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                success: false,
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category already exists"
            })
        }
        
        const category = await new categoryModel({name, slug: slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Create category successfully",
            category
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Create category"
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        console.log(`Update category: ${req.body.name}`)
        const {name} = req.body
        const {id} = req.params
        const existingCategory = await categoryModel.findOne({name});
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
          );
          res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
          });
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Update category"
        })
    }
}

//get all category
export const getAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All category successfully",
            category
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Get all category"
        })
    }
}

//get single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        res.status(200).send({
            success: true,
            message: "Get Single category successfully",
            category
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Get single category"
        })
    }
}

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while Delete category"
        })
    }
}