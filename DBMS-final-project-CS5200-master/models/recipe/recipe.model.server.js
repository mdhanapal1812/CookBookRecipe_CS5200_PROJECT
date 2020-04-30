const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
module.exports = mongoose.model('RecipeModel', recipeSchema);


