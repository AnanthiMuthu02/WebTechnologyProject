const Router = require('express')
const {createRecipe, getRecipes, getRecipe} = require('../controllers/recipeController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware, createRecipe)  
router.get('/', getRecipes)
router.get('/:id', getRecipe)

module.exports = router