const Router = require('express')
const {createRecipe, getRecipes, getRecipe} = require('../controllers/recipeController')
const authMiddleware = require('../middleware/authMiddleware')
const fileUpload = require('../middleware/fileUpload'); 

const router = Router()

router.post('/', authMiddleware, fileUpload.single('thumbnail'), createRecipe);
router.get('/', getRecipes)
router.get('/:id', getRecipe)

module.exports = router