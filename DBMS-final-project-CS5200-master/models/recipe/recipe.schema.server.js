const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    recipeId: Number,
    title: String,
    readyInMinutes: String,
    servings: String,
    image: String,
}, {collection: 'recipe'});
module.exports = recipeSchema;