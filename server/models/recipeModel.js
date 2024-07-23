const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    Ingredients: { type: String, required: true },
    directions: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Add the thumbnail field
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = model('Recipe', recipeSchema);
