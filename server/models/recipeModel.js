const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    Ingredients: {type: String, required: true},
    directions: {type: String, required: true},
    creator:{type: Schema.Types.ObjectId, ref:"User"},

},{timestamps: true})

module.exports = model('Recipe', recipeSchema)