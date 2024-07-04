const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')



const createRecipe = async(req , res, next) => {
    try{
        let{title, description, Ingredients, directions} = req.body;
        if(!title || !description || !Ingredients || !directions){
            
            return next(new HttpError("Fill in all the fields and choose thumbnail.", 422))

        }
        const {thumbnail} = req.files;
        console.log(thumbnail)

        if(thumbnail.size > 2000000){
            return next(new HttpError("File should be less than 2mb.", 422))

        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async(err) => {
            if(err){
                return next(new HttpError(err))
            }else {
                const newRecipe = await Recipe.create({title, description, Ingredients, directions, thumbnail: newFilename, creator: req.user.Id})
                if(!newRecipe){
                    return next(new HttpError("Recipe could'nt be created", 422))
                }
                const currenUser = await User.findById(req.user.id);
                const userRecipeCount = currenUser.recipes + 1;
                await User.findByIdAndUpdate(req.user.id, {recipes: userRecipeCount})
                res.status(201).json(newRecipe)


            }
        })
    }catch(error){
        return next(new HttpError(error))
    }
}

const getRecipes = async(req , res, next) => {
    res.json("get all Recipes")
}

const getRecipe = async(req , res, next) => {
    res.json("get single recipes")
}

module.exports = {createRecipe, getRecipes, getRecipe}